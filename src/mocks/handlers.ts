import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://test.omniswift.com.ng/api/viewAllAges", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": [
        {
          "id": 1,
          "age": "30"
        },
        {
          "id": 2,
          "age": "28"
        }
      ]
    })
  }),
  http.get("https://test.omniswift.com.ng/api/viewAllGender", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": [
        {
          "id": 1,
          "gender": "male"
        },
        {
          "id": 2,
          "gender": "female"
        }
      ]
    })
  }),
  http.get("https://test.omniswift.com.ng/api/viewAllStates", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": [
        {
          "id": 1,
          "name": "Abuja"
        },
        {
          "id": 2,
          "name": "Kano"
        }
      ]
    })
  }),
  http.get("https://test.omniswift.com.ng/api/viewAllLevels", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": [
        {
          "id": 1,
          "gender": "100 Level"
        },
        {
          "id": 2,
          "gender": "200 Level"
        }
      ]
    })
  }),
  http.get("https://test.omniswift.com.ng/api/viewAllData", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": {
        "students": [
          {
            "id": 1,
            "surname": "Doe",
            "firstname": "Jane",
            "age": 24,
            "gender": "female",
            "level": "400 level",
            "state": "Abuja",
          },
          {
            "id": 1,
            "surname": "Doe",
            "firstname": "John",
            "age": 19,
            "gender": "male",
            "level": "200 level",
            "state": "Kano",
          },
        ]
      }
    })
  }),
  http.post("https://test.omniswift.com.ng/api/filterData", () => {
    return HttpResponse.json({
      "message": "Successful",
      "data": {
        "students": [
          {
            "id": 1,
            "surname": "Doe",
            "firstname": "Jane",
            "age": 24,
            "gender": "female",
            "level": "400 level",
            "state": "Abuja",
          },
          {
            "id": 1,
            "surname": "Doe",
            "firstname": "John",
            "age": 19,
            "gender": "male",
            "level": "200 level",
            "state": "Kano",
          },
        ]
      }
    })
  })
]
