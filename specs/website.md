# IdeathonBcn Website Spec

## Problem

Barcelona's SMBs have internal problems (operations, onboarding, HR, project management) but lack capacity or expertise to scope and solve them. Meanwhile, local developers, consultants, and strategists want to connect with real businesses and build their networks. There's no efficient way to matchmake these groups and create value for both sides.

IdeathonBcn is a one-day hackathon (March 23rd, 2025) that brings them together. The website needs to:
1. Explain the concept clearly to three distinct audiences
2. Drive applications from businesses and builders
3. Attract sponsors/partners
4. Build credibility by showcasing experts, judges, and participating businesses

## Solution Overview

A static, trilingual (EN/ES/CA) single-page website with bold, distinctive design. Includes application forms for businesses, builders, and partners that submit to Google Sheets/Airtable for manual review and approval.

## Event Details

- **Name**: IdeathonBcn
- **Date**: March 23rd, 2025
- **Location**: Swiss Business School, Poblenou, Barcelona
- **Capacity**: ~10 businesses, 3-4 builders per team (~40-50 total)
- **Pricing**: Businesses pay (invoiced after approval), builders free

## Detailed Requirements

### Site Structure (Single Page)

1. **Hero Section**
   - Event name and tagline
   - Date and location
   - Countdown timer to March 23rd
   - Primary CTA buttons for each audience type

2. **What is IdeathonBcn**
   - Brief concept explanation
   - The matchmaking model: SMBs + builders = scoped solutions

3. **Value Propositions** (three distinct sections)

   **For Small Businesses:**
   - Get fresh perspectives on internal problems
   - Understand potential technology solutions
   - Learn what tech stack might work
   - Meet builders you might want to hire
   - See how other businesses solve similar problems

   **For Builders (Developers/Consultants/Strategists):**
   - Connect with real Barcelona SMBs
   - Potential contracts and job opportunities
   - Network with other builders
   - Learn soft skills: client communication, scoping, stakeholder management
   - Open to experts through students

   **For Sponsors/Partners:**
   - Product visibility during technical builds
   - Local tech ecosystem exposure
   - Social media, website, local/national press coverage
   - Keynote speaking opportunity
   - Workshop slots to demo tools
   - Embed team members in building groups

4. **How It Works**
   - High-level schedule blocks only (not detailed timeline):
     - **Morning**: Ideation session - draw out problems, map AI/automation opportunities, generate solution ideas
     - **Midday**: Pick 1-2 ideas, scope in detail
     - **Afternoon**: Building phase with midday showcase for cross-pollination
     - **Evening**: Demo showcase, judging by local entrepreneurs

5. **People Sections** (photo + name + title/company cards)
   - **Experts**: Mentors available during the event
   - **Judges**: Local entrepreneurs and product builders
   - **Participating Businesses**: SMBs already signed up (social proof)
   - Use stock images as placeholders for now

6. **Sponsors Section**
   - 2-3 tiers with different logo sizes/prominence
   - Brief benefits listed per tier
   - CTA to become a partner

7. **Application Forms** (three separate forms)

   **Business Application:**
   - Company name
   - Contact info (name, email)
   - What is your #1 issue right now?
   - Why should you be selected?

   **Builder Application:**
   - Name, email
   - Role (developer, designer, marketer, strategist, other)
   - Why are you interested?

   **Partner Inquiry:**
   - Company name
   - Contact info
   - Interest level/message

8. **Location Section**
   - Swiss Business School, Poblenou
   - Map embed or address
   - Brief area description (one of the cool districts of Barcelona)

9. **Footer**
   - Social links
   - Contact email
   - Language switcher (EN/ES/CA)

### Technical Approach

- **Stack**: Static HTML/CSS/JS (no framework)
- **Hosting**: Netlify, Vercel, or GitHub Pages
- **Forms**: Submit via webhook to `https://hook.relay.app/api/v1/playbook/cml7vyme40f1g0om3fnu24c51/trigger/MYWOji31SUNMPb1GIv5B9w`
- **i18n**: Client-side language switching with JSON translation files or data attributes
- **Design**: Bold, distinctive, Barcelona-inspired. Draw from the city's architecture (Gaudi curves, modernisme, Gothic quarter textures), Mediterranean colors, and cultural energy. Avoid generic hackathon/tech aesthetics. Must stand out.
- **Responsive**: Mobile-first, works on all devices

### Signup Flow

1. User fills out application form on website
2. Data submitted via webhook to Relay.app automation
3. Organizers manually review applications
4. Approved applicants receive email confirmation
5. Businesses invoiced separately after approval
6. Pre-event: matchmaking survey sent to approved participants
7. Organizers manually curate team matches based on problem/skill fit

## Out of Scope

- Payment processing on website (invoicing handled separately)
- User accounts/login system
- Automated matching algorithm
- Detailed hour-by-hour schedule
- Blog or news section
- Event check-in system
- Post-event results page (will be added after event)

## Edge Cases & Error Handling

- **Form validation**: Required fields, valid email format
- **Language fallback**: Default to English if translation missing
- **Capacity**: Flexible - no hard caps or waitlist needed on website
- **Missing content**: Stock images used until real photos/logos provided
- **Post-event**: Site will be updated to archive mode showing winners and outcomes

## Success Criteria

- Clear value proposition communicated to all three audiences
- Application forms successfully capture and transmit data
- Language switching works smoothly across all three languages
- Site loads fast (<3s) and works on mobile
- Design is memorable - doesn't look like "every other hackathon site"
- Drives qualified applications from businesses and builders
- Attracts sponsor interest

## Open Questions

1. ~~What email address should forms send notifications to?~~ **RESOLVED: Using Relay webhook**
2. Are there specific stock images or image styles preferred?
3. ~~Any specific brand colors or aesthetic direction?~~ **RESOLVED: Barcelona-inspired**
4. What are the exact sponsor tier names and benefits for each?
5. Application deadline date (if any)?
6. Social media handles to link to?
