#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/tours"

echo "=== Testing Tour API ==="

# Test 1: Get all tours
echo "1. Getting all tours..."
curl -s -X GET $BASE_URL
echo -e "\n"

# Test 2: Create a new tour
echo -e "\n2. Creating a new tour..."
RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Adventure Tourrrr",
    "price": 299,
    "review": "A fantastic test tour for API testing purposes"
  }')

echo $RESPONSE
echo -e "\n"

# Extract tour ID from response (basic extraction without jq)
TOUR_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo "Created tour ID: $TOUR_ID"

# Test 3: Get single tour
if [ ! -z "$TOUR_ID" ]; then
    echo -e "\n3. Getting single tour..."
    curl -s -X GET $BASE_URL/$TOUR_ID
    echo -e "\n"
    
    # Test 4: Update tour
    echo -e "\n4. Updating tour..."
    curl -s -X PATCH $BASE_URL/$TOUR_ID \
      -H "Content-Type: application/json" \
      -d '{
        "price": 399,
        "review": "Updated review: Even better than expected!"
      }'
    echo -e "\n"
    
    # Test 5: Delete tour
    echo -e "\n5. Deleting tour..."
    curl -s -X DELETE $BASE_URL/$TOUR_ID
    echo -e "\n"
else
    echo "Could not extract tour ID - skipping individual tour tests"
fi

echo -e "\n=== Testing Complete ==="