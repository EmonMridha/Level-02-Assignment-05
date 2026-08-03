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

| Task | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| LoginForm | POST | `/auth/login` | Login user |
| RegisterForm | POST | `/auth/register` | Register new user |
| Navbar | GET | `/auth/me` | Get logged-in user |


---

## Properties

| Task | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Home Page | GET | `/properties` | Display featured properties |
| Properties Page | GET | `/api/properties` | Show all properties |
| Property Details | GET | `/api/properties:id` | Show property details |
| Create Property Form | POST | `/api/properties` | Create property |
| Edit Property Form | PATCH | `/api/properties/:id` | Update property |
| Delete Property Button | DELETE | `/api/properties/:id` | Delete property |
| My Properties | GET | `/api/properties/myProperties` | Get landlord's properties |
| Toggle Availability | PATCH | `/api/properties/:id` | Update property availability |

---

## Rental Requests

| Task | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Request Rental Button | POST | `/api/rentalRequests` | Submit rental request |
| Tenant Requests | GET | `/api/rentalRequests/myRequests` | Get tenant's requests |
| Landlord Requests | GET | `/api/rentalRequests` | Get requests for landlord |
| Request Details | GET | `/api/rentalRequests/myRequests/:id` | Get single request |
| Approve Request | PATCH | `/rentalRequests/:id` | Approve request (status: APPROVED) |


---

## Payments

| Frontend Component/Page | Method | Backend Endpoint | Purpose |
|--------------------------|--------|------------------|---------|
| Payment Page | POST | `/api/payment/create` | Create payment session |
|verify | GET | `/api/payment/confirm` | Handle successful payment |
| Payment History | GET | `/api/payment/histories` | Get user's payment history |

---

## Users (Admin)

| Get My Profile | GET | `/api/auth/me` | Get current user data |

---


