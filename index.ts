async function getAvailableDates(
  year: number,
  month: number
): Promise<string[]> {
  // Format the start date to the first day of the specified month
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

  const url =
    "https://www.booking.com/dml/graphql?aid=304142&label=review_am&sid=e825501b91b67797c0df6752ffafda74&activeTab=htReviews&dist=0&keep_landing=1&rurl=ceb1442d1cd1366b&sb_price_type=total&type=total&lang=en-us";

  const headers = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,sl;q=0.8,ne;q=0.7,de;q=0.6,la;q=0.5",
    "apollographql-client-name": "b-property-web-property-page_rust",
    "apollographql-client-version": "NdJQHYJS",
    "content-type": "application/json",
    origin: "https://www.booking.com",
    priority: "u=1, i",
    referer:
      "https://www.booking.com/hotel/hr/vib-vacation-home.html?aid=304142&label=review_am&sid=e825501b91b67797c0df6752ffafda74&activeTab=htReviews&dist=0&keep_landing=1&rurl=ceb1442d1cd1366b&sb_price_type=total&type=total&",
    "sec-ch-ua":
      '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "x-apollo-operation-name": "AvailabilityCalendar",
    "x-booking-context-action": "hotel",
    "x-booking-context-action-name": "hotel",
    "x-booking-context-aid": "304142",
    "x-booking-csrf-token":
      "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjb250ZXh0LWVucmljaG1lbnQtYXBpIiwic3ViIjoiY3NyZi10b2tlbiIsImlhdCI6MTc1Njc1NzM1NiwiZXhwIjoxNzU2ODQzNzU2fQ.NOe7MMMq9l7-UJKiPtrEgOhfDWZWzA6Vw08DTbB7is87XI5QbSLXQcoxCobO7vlPQqRQaVoXVqhhxWuA01AkZQ",
    "x-booking-dml-cluster": "rust",
    "x-booking-et-serialized-state":
      "EzKZKQ1zp-E-7A0Y8BpubDTpRw3ZdaKMjzVD8XDyWdfsQfIXiTYcwXiJKZq1xqd3niKHAMI9VOXYGWOtd9igGOrVxNJLts2yl",
    "x-booking-pageview-id": "f0818db5c8c20638",
    "x-booking-site-type-id": "1",
    "x-booking-topic": "capla_browser_b-property-web-property-page",
  };

  const body = {
    operationName: "AvailabilityCalendar",
    variables: {
      input: {
        travelPurpose: 2,
        pagenameDetails: {
          countryCode: "hr",
          pagename: "vib-vacation-home",
        },
        searchConfig: {
          searchConfigDate: {
            startDate: startDate,
            amountOfDays: 90,
          },
          nbAdults: 2,
          nbRooms: 1,
          nbChildren: 0,
          childrenAges: [],
        },
      },
    },
    extensions: {},
    query:
      "query AvailabilityCalendar($input: AvailabilityCalendarQueryInput!) {\n  availabilityCalendar(input: $input) {\n    ... on AvailabilityCalendarQueryResult {\n      hotelId\n      days {\n        available\n        avgPriceFormatted\n        checkin\n        minLengthOfStay\n        __typename\n      }\n      __typename\n    }\n    ... on AvailabilityCalendarQueryError {\n      message\n      __typename\n    }\n    __typename\n  }\n}\n",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.data.availabilityCalendar.days) {
      const availableDays = data.data.availabilityCalendar.days
        .filter((day: any) => day.available)
        .map((day: any) => day.checkin)
        .sort(); // Sort dates chronologically
      return availableDays;
    } else {
      console.error("Could not find available days in the response:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching availability:", error);
    return [];
  }
}

async function main() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

  console.log(
    `Checking availability for ${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}`
  );

  const availableDates = await getAvailableDates(currentYear, currentMonth);

  if (availableDates.length > 0) {
    console.log("✅ Available check-in dates found:", availableDates);
    console.log(`Found ${availableDates.length} available dates`);
  } else {
    console.log("❌ No available dates found");
  }

  return availableDates;
}

// Run the main function
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
