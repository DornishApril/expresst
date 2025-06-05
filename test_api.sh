#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/tours"

echo "=== SIMPLE API VALIDATION TESTS ==="
echo ""

# Test 1: Basic functionality
echo "TEST 1: Create and Validate Tour"
echo "Creating tour..."
RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Validation Test Tour",
    "price": 399,
    "review": "Testing API validation"
  }')

echo "Response: $RESPONSE"

# Check if creation was successful
if echo "$RESPONSE" | grep -q '"status":"success"'; then
    echo "✓ PASS: Tour created successfully"
    
    # Extract ID
    TOUR_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
    echo "Tour ID: $TOUR_ID"
    
    # Test getting the tour
    echo ""
    echo "Getting created tour..."
    GET_RESPONSE=$(curl -s -X GET $BASE_URL/$TOUR_ID)
    echo "Response: $GET_RESPONSE"
    
    if echo "$GET_RESPONSE" | grep -q "Validation Test Tour"; then
        echo "✓ PASS: Tour retrieved successfully with correct name"
    else
        echo "✗ FAIL: Tour name not found in response"
    fi
    
    # Clean up - delete the tour
    echo ""
    echo "Cleaning up - deleting tour..."
    DELETE_RESPONSE=$(curl -s -X DELETE $BASE_URL/$TOUR_ID)
    if echo "$DELETE_RESPONSE" | grep -q '"status":"success"'; then
        echo "✓ PASS: Tour deleted successfully"
    else
        echo "✗ FAIL: Tour deletion failed"
    fi
    
else
    echo "✗ FAIL: Tour creation failed"
    echo "Response: $RESPONSE"
fi

echo ""
echo "TEST 2: Error Handling - Missing Fields"
echo "Creating tour with missing price..."
ERROR_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Incomplete Tour",
    "review": "Missing price field"
  }')

echo "Response: $ERROR_RESPONSE"

if echo "$ERROR_RESPONSE" | grep -q '"status":"fail"\|"status":"Error"'; then
    echo "✓ PASS: Correctly rejected tour with missing fields"
else
    echo "✗ FAIL: Should have rejected tour with missing price"
fi

echo ""
echo "TEST 3: Error Handling - Invalid ID"
echo "Trying to get tour with invalid ID..."
INVALID_RESPONSE=$(curl -s -X GET $BASE_URL/invalid-id-123)
echo "Response: $INVALID_RESPONSE"

if echo "$INVALID_RESPONSE" | grep -q '"status":"Not Found"\|"status":"Error"\|"status":"fail"'; then
    echo "✓ PASS: Correctly handled invalid ID"
else
    echo "✗ FAIL: Should have returned error for invalid ID"
fi

echo ""
echo "=== VALIDATION TESTS COMPLETE ==="