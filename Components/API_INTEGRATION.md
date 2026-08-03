# RentNest - API Integration Documentation

## Base URL
```
https://assignment-04-orpin.vercel.app
```

## Common Headers
All authenticated requests require:
```
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

---

## Authentication

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| LoginForm | POST | `/auth/login` | /api/auth/login |
| RegisterForm | POST | `/auth/register` | /api/auth/register |
| Navbar | GET | `/auth/me` | Get logged-in user |
| Logout Button | POST | `/auth/logout` | Logout user |

---

## Properties

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Home Page | GET | `/properties` | Display featured properties |
| Properties Page | GET | `/properties` | Show all properties |
| Property Details | GET | `/properties/:id` | Show property details |
| Create Property Form | POST | `/properties` | Create property |
| Edit Property Form | PATCH | `/properties/:id` | Update property |
| Delete Property Button | DELETE | `/properties/:id` | Delete property |
| My Properties | GET | `/properties/myProperties` | Get landlord's properties |
| Toggle Availability | PATCH | `/properties/:id` | Update property availability |

---

## Rental Requests

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Request Rental Button | POST | `/rentalRequests` | Submit rental request |
| Tenant Requests | GET | `/rentalRequests/my` | Get tenant's requests |
| Landlord Requests | GET | `/rentalRequests/landlord` | Get requests for landlord |
| Request Details | GET | `/rentalRequests/:id` | Get single request |
| Approve Request | PATCH | `/rentalRequests/:id` | Approve request (status: APPROVED) |
| Reject Request | PATCH | `/rentalRequests/:id` | Reject request (status: REJECTED) |

---

## Payments

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Payment Page | POST | `/payments/create` | Create payment session |
| Payment Success | GET | `/payments/success` | Handle successful payment |
| Payment Cancel | GET | `/payments/cancel` | Handle cancelled payment |
| Payment History | GET | `/payments/history` | Get user's payment history |

---

## Users (Admin)

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Admin Users Page | GET | `/auth/users` | Get all users |
| Update User Status | PATCH | `/auth/users/:id` | Block/Activate user |
| Get My Profile | GET | `/auth/me` | Get current user data |

---

## Admin

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Admin Properties | GET | `/auth/admin/properties` | Get all properties |
| Admin Requests | GET | `/auth/admin/rentalRequests` | Get all rental requests |

---

## Response Format

All endpoints return:
```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

## Error Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": {}
}
```