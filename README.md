## Implementation Guidelines

### Authentication

- Implemented JWT-based authentication for secure user sessions with one day session.
- Three types of users are supported: Author, Admin, and Retail Users.

### Authorization

- Implemented RBAC to control access based on user roles (Author, Admin, Retail User).
- Each user is assigned a role during registration.
- Implemented JWT-based authorization with role-based access control.

### Authorization Middleware

- Created middleware functions for role-based authorization.
- Middleware functions can be used to restrict access to specific routes based on user roles.

### Password Encryption

- Utilized a strong encryption algorithm to securely hash and store user passwords.
- Passwords are not stored in plaintext in the database, enhancing security.


### User Registration and Login

#### Author Registration and Login

- Authors can register using a dedicated registration endpoint.
- Authors can log in using their registered credentials.
- JWT tokens are issued upon successful login for subsequent authenticated requests.

### Example API Endpoints

POST /api/v1/auth/author/register
{
"name": "author123",
"password": "password123",
"email": "author123@example.com"
}

POST /api/v1/auth/author/login
{
"email": "author123@example.com",
"password": "password123"
}

#### Retail User Registration and Login

- Retail users can register using a dedicated registration endpoint.
- Retail users can log in using their registered credentials.
- JWT tokens are issued upon successful login for subsequent authenticated requests.

### Example API Endpoints

POST /api/v1/auth/retailUser/register
{
"name": "user456",
"password": "userpassword456",
"email": "user456@example.com"
}

POST /api/v1/auth/retailUser/login
{
"email": "author123@example.com",
"password": "password123"  
}

#### Admin

- Admin is pre-registered in the database with default credentials (email:admin@gmail.com,password:password123).
- Admin can log in using the provided admin credentials.
- JWT tokens are issued upon successful admin login for subsequent authenticated requests.

POST /api/v1/auth/admin/login
{
"email": "admin@gmail.com",
"password": "password123"  
}



### Books

#### Adding a Book (Authenticated Route)

- Authors can add books after authenticating with a valid JWT token.
- Each request to add a book should include the authentication token in the headers.
- BookId is a unique identifier for each book (e.g., book-1, book-2).
- When a retail user purchases a book, the `sellCount` is automatically increased.
- Utilized SQL model hooks to trigger an action after a successful purchase.
- SellCount is updated in the database based on the purchase history.- Price is validated to be within the range of 100 and 1000.
- Title is slugified and stored as a unique string value for book URLs.
- Book details are securely stored in the SQL database.

#### Example API Endpoint

POST /api/v1/author/addBook
Headers:
  authorization: Author JWT Token
Body:
{
  "authors": 1, // auhtor id is given instead of author name for ease handling of db
  "title": "Unique Book Title",
  "description": "Book Description",
  "price": 500
}


### Purchase History

#### Purchasing a Book (Authenticated Route)

- Authorized users can purchase a book after authenticating with a valid JWT token.
- Each purchase triggers the generation of a unique purchase ID in the format {{YEAR}}-{{MONTH}}-{{numeric increment id}}.
- The user receives a purchase confirmation email with details of the purchase.
- SQL model hooks are utilized to increase the sell count of the respective book after a successful purchase.

#### Unique PurchaseID and Race Condition Handling

- Implemented a mechanism to ensure that numeric values for `purchaseId` are not missed or duplicated on the application level.
- The `purchaseId` follows the format {{YEAR}}-{{MONTH}}-{{numeric increment id}}.
- Proper synchronization is implemented to handle race conditions when generating unique purchase IDs using transaction.

#### Example API Endpoint for Purchasing a Book

POST /api/retail-users/purchase
Headers:
  Authorization: Retail User JWT Token
Body:
{
  "bookId": "book_1",
  "quantity": 1
  "price":500
}

### Purchase History

#### View Purchase History

- Users have the ability to view their purchase history, allowing them to track and review their past book purchases.

#### Example API Endpoint for Retrieving Purchase History

GET /api/v1/retailUser/purchaseHistory
Headers:
  Authorization:  Retail User JWT Token


### Revenue Tracking for Authors

#### Increase in Author's Revenue

- Authors' revenue increases with each user purchase.
- The sell count and price of each book are used to calculate the revenue for the respective author.

#### Notify Users and Authors about Purchase Information

- AUthor and user receive notifications about purchases.
- Notifications include details such as book details, quantity, and total amount.
- Notifications are sent using nodemailer.

#### Email Authors with Monthly, Yearly, and Total Revenue at end of each month

- A cron job is assigned to run at the end of each month.
- Authors receive an email detailing monthly revenue, yearly revenue, and total revenue.
- The cron job uses nodemailer and an email queue implemented with Redis Bull to efficiently handle email notifications.


### Email Notifications

#### Asynchronous Handling with Redis Bull Queue

- Email notifications are handled asynchronously using Redis Bull queue.
- This ensures that email sending does not block the main application thread.
- Jobs related to email notifications are queued and processed in the background.

#### Sending Purchase Confirmation Emails

- Purchase confirmation emails are sent to users asynchronously after a successful purchase.
- Relevant purchase information, including purchase ID, book details, quantity, and total price, is included in the email.

#### Sending Bulk Email Notifications for New Book Releases

- A feature is implemented to send bulk email notifications to all retail users about new book releases.
- Redis Bull queue is used to queue mailing jobs for bulk emails.
- A limit of 100 emails per minute is enforced using Bottleneck to avoid abuse and maintain email sending constraints.


## Additional Features

### Search and Filtering Options for Books

#### Implemented Search and Filtering

- Users can search for books based on various criteria.
- Filtering options include:
  - **Title:** Search for books by title.
  - **Author:** Search for books by the author's name.
  - **Price Range:** Filter books based on a specified price range.
  - **Release Date Range:** Filter books based on the release date range.

#### Example API Endpoint for Search and Filtering

GET /api/v1/retailUser/search  (/api/v1/retailUser/search?title='title'&author='author name'&price=[min.max]&date=["02-02-2024","08-02-2024"])
Headers:
  Authorization: Retail User JWT Token
Query Parameters:
- title (optional): Search books by title.
- author (optional): Search books by author name.
- price (optional): [min,max] price range.
- date (optional): [Start Date,End Date] for the release date range.


### Secure Payment Processing for Book Purchases

#### Integrated Stripe for Payment Processing

- Implemented secure payment processing using Stripe.
- Backend integration is completed to handle payment confirmations and store payment details in the database.
- Frontend integration is required to complete the payment process.

#### Example API Endpoint for Initiating Payment

POST /api/retail-users/initiate-payment
Headers:
  Authorization: Retail User JWT Token
Body:
{
  "amount":500
}


### User Reviews and Ratings

#### Feature for Users to Review and Rate Books

- Users can write reviews and provide ratings for books.
- Review details, including user information, book details, and ratings, are stored securely in the database.

#### Example API Endpoint for Submitting a Review

POST /api/v1/retailUser/reviewBook
Headers:
  Authorization: Retail User JWT Token
Body:
{
  "bookId": "book-1",
  "rating": 5,
  "review": "This book is amazing!"
}

#### admin can send revenue notification to all authors

- Admin also can send email notifications to all authors regarding monthly revenue

POST /api/v1/admin/sendNotification
Headers:
  Authorization: Admin JWT Token
