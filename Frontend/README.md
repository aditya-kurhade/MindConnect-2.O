# MindConnect 2.0 Frontend

## Project Title
**MindConnect 2.0** - A Mental Health & Wellness Platform

## Project Description
MindConnect 2.0 is a comprehensive digital mental health and wellness platform that connects clients with professional counsellors and AI-powered support. The platform enables seamless communication, appointment scheduling, progress tracking, and access to wellness resources. Built with React and Vite, this frontend provides intuitive interfaces for both clients seeking mental health support and counsellors managing their practice and client interactions.

### Overview
React + Vite single-page app for clients and counsellors to sign in, view dashboards, and interact with wellness resources.

## Features (current)
- Client auth (sign up/login) with JWT token storage in cookies
- Counsellor auth (sign up/login)
- Client dashboard UI (stats, appointments, quick actions, counsellor cards)
- Counsellor dashboard UI (profile data, client list, schedule, analytics placeholders)
- Forums/resources pages scaffolded

## In progress / planned
- Wire real data to forum/resources pages and dashboard stats
- CRUD for clients/appointments on counsellor side
- Messaging/notifications between clients and counsellors
- Profile editing and avatar upload
- Better form validation and error states

## Tech stack
- React 19, React Router 7
- Vite 7 toolchain
- Styling: Tailwind CSS 4 + custom CSS
- UI: React Icons, Framer Motion
- Data/API: Axios, js-cookie for JWT, Supabase/Appwrite SDKs (planned usage)
- Tooling: ESLint 9, SWC React plugin

## Project status
- Frontend pages and routing: ~70% (UI largely built, data wiring pending)
- Client auth flow: ~80% (forms + token handling; server endpoints available)
- Counsellor auth/dashboard: ~70% (UI ready; CRUD and analytics still mock)
- Forum/resources: ~40% (UI skeleton, needs backend integration)

## Running locally
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`

Backend runs separately (Express/MySQL, port 5000). Ensure `JWT_SECRET` and DB env vars are set there.
