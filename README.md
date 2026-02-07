# E-commerce project

## Overview

This is a full-stack web application built using Spring Boot for the backend and React for the frontend. It includes a
storefront where customers can browse and purchase products, as well as an admin panel that enables store owners to
manage collections and products, keep track of orders and much more.

## Features

### Frontend

* Landing page displaying most-purchased products and different collections.
* Product listing with sorting, filtering by collection, and pagination.
* Product details page with multiple images and a rich-text description.
* Checkout process integrated with Stripe.
* Success, Cancel, and Not Found pages.
* Admin dashboard with role-based access control.
* Pages for managing products, collections, orders and members.

### Backend

* RESTful JSON API
* CRUD operations for products, collections, and users.
* Orders management and analytics
* stock decrement on purchase, sorting, pagination.
* Image management via Cloudflare R2 and aws sdk.
* Security using Spring Security and JWT authentication.
* Input validations and exception handling.
* Payment integration with Stripe.

## Technologies

* **Frontend:** React.js, React Router, TypeScript, CSS, Tailwind, Shadcn and others
* **Backend:** Spring Boot, Spring Security, Hibernate/JPA, PostgreSQL, Stripe SDK, Cloudflare R2 and others

