#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "======================================"
echo "Trello Realtime API - cURL Examples"
echo "======================================"
echo ""

echo "1. Health Check"
echo "Command:"
echo "curl ${BASE_URL}/health"
echo ""
echo "Response:"
curl -s ${BASE_URL}/health | jq .
echo ""
echo "--------------------------------------"
echo ""

echo "2. Get All Boards"
echo "Command:"
echo "curl ${BASE_URL}/trello/boards"
echo ""
echo "Response:"
curl -s ${BASE_URL}/trello/boards | jq .
echo ""
echo "--------------------------------------"
echo ""

echo "3. Get Board Lists"
echo "Note: Replace BOARD_ID with actual board ID from step 2"
echo "Command:"
echo "curl ${BASE_URL}/trello/boards/BOARD_ID/lists"
echo ""
echo "--------------------------------------"
echo ""

echo "4. Get Cards"
echo "Note: Replace BOARD_ID with actual board ID"
echo "Command:"
echo "curl ${BASE_URL}/trello/boards/BOARD_ID/cards"
echo ""
echo "--------------------------------------"
echo ""

echo "5. Create Card"
echo "Note: Replace LIST_ID with actual list ID from step 3"
echo "Command:"
cat << 'EOF'
curl -X POST http://localhost:5000/api/trello/cards \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "LIST_ID",
    "name": "Test Card from cURL",
    "description": "This card was created using cURL"
  }'
EOF
echo ""
echo "--------------------------------------"
echo ""

echo "6. Update Card"
echo "Note: Replace CARD_ID with actual card ID"
echo "Command:"
cat << 'EOF'
curl -X PUT http://localhost:5000/api/trello/cards/CARD_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Card Name",
    "desc": "Updated description"
  }'
EOF
echo ""
echo "--------------------------------------"
echo ""

echo "7. Register Webhook"
echo "Note: Replace BOARD_ID with actual board ID"
echo "Command:"
cat << 'EOF'
curl -X POST http://localhost:5000/api/webhooks/register \
  -H "Content-Type: application/json" \
  -d '{
    "boardId": "BOARD_ID",
    "description": "Test Webhook"
  }'
EOF
echo ""
echo "--------------------------------------"
echo ""

echo "8. Get All Webhooks"
echo "Command:"
echo "curl ${BASE_URL}/webhooks"
echo ""
echo "Response:"
curl -s ${BASE_URL}/webhooks | jq .
echo ""
echo "--------------------------------------"
echo ""

echo "9. Delete Webhook"
echo "Note: Replace WEBHOOK_ID with actual webhook ID from step 8"
echo "Command:"
echo "curl -X DELETE ${BASE_URL}/webhooks/WEBHOOK_ID"
echo ""
echo "--------------------------------------"
echo ""

echo "Testing Complete!"
echo ""
echo "For formatted output, pipe commands through jq:"
echo "Example: curl ${BASE_URL}/health | jq ."
