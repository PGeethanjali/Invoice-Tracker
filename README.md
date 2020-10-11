# INVOICE TRACKER

This is a application to manage invoices.

## Installation

Use the package npm to start and install all the required packages

```bash
npm i
```
To run node file
```bash
node index.js
```
To run Angular
```bash
ng serve
```
## Usage

  - After successfull installation, the project runs.
  - The first Screen is Sign In, if account doesn't exist, then Sign Up.
  ![login](/login.png)
  ![signup](/signup.png)
  - There are two roles, namely Admin and User.
  
 
#### User
  - List View - lists the invoices created by the user and the user has permission to create, edit and delete the invoice.
  
  ![list](/list.png)
  ![add](/add.png)
  ![edit](/edit.png)
  
  - The user can filter the invoice based on date.
  
   ![list_filter](/list_filter.png)
  - Graph View - shows the graphical representation of the total invoices.
  
  ![user_graph](/user_graph.png)
#### Admin
  - List View - lists the invoices created by the all the users.
   
  - The admin can filter the invoice based on date.
  
  ![admin_list](/admin_list.png)
  - Graph View - shows the graphical representation of the total invoices with the user details.
  
  ![admin_graph](/admin_graph.png)
 


