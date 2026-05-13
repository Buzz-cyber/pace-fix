import { NextResponse } from "next/server"

// Simple in-memory cache
let cache = null
let cacheTime = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(request) {
  try {
    // Return cached data if still valid
    if (cache && cacheTime && Date.now() - cacheTime < CACHE_TTL) {
      return NextResponse.json(cache, {
        headers: {
          "X-Cache": "HIT",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Backend API URL not configured" },
        { status: 500 }
      )
    }

    const url = new URL(request.url)
    const timestamp = url.searchParams.get("_t") || Date.now()
    const apiUrl = `${baseUrl}promotions/?_t=${timestamp}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API returned ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Update cache
    cache = data
    cacheTime = Date.now()

    return NextResponse.json(data, {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch (error) {
    console.error("Error fetching promotions:", error)

    // Return stale cache on error if available
    if (cache) {
      return NextResponse.json(cache, {
        headers: {
          "X-Cache": "STALE",
          "Cache-Control": "public, s-maxage=60",
        },
      })
    }

    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    )
  }
}
