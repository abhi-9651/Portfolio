1. Introduction
Purpose

This Design System defines every visual and interaction rule used throughout Project NOVA.

It ensures consistency across every component, animation, layout, and future feature.

Rather than treating pages individually, the system treats the website as one connected product.

Every design decision should reference this document before implementation.

Goals

Maintain

Visual Consistency
Reusable Components
Accessible Interfaces
Smooth Interactions
Professional Appearance
Scalable Architecture
Scope

The Design System governs

Typography

Colors

Spacing

Layout

Motion

Components

Animations

Interactions

Responsive Design

Accessibility

2. Brand Identity

Project NOVA represents

A futuristic digital universe built around clarity, precision and elegance.

The visual identity combines inspiration from

Apple's Human Interface Guidelines
Stripe's clean interfaces
Linear's modern dashboard aesthetics
Iron Man's JARVIS
Interstellar's cinematic atmosphere

without copying any of them.

Personality

The interface should feel

Professional

Intelligent

Elegant

Premium

Confident

Minimal

Cinematic

Calm

Emotional Journey

Visitors should experience

Curiosity

↓

Exploration

↓

Discovery

↓

Trust

↓

Connection
3. Core Philosophy

Project NOVA follows one principle.

Technology should feel human.

Animations should never distract.

Effects should never overpower.

The interface should quietly communicate quality.

Every component should answer

Does this improve understanding?

If not,

remove it.

4. Design Commandments

Every future design decision must follow these rules.

1.

Content before decoration.

2.

Animation must communicate.

Never animate for attention.

3.

Whitespace is part of the design.

4.

Consistency is more valuable than creativity.

5.

Less glow creates more elegance.

6.

Dark themes should improve readability.

Not reduce it.

7.

Every animation should feel intentional.

8.

Every section should feel connected.

9.

Every component belongs to one universe.

10.

Performance is a design feature.

5. Visual Language

The visual language of Project NOVA is inspired by

Space

Large open layouts.

Depth.

Silence.

AI Interfaces

Glass

Glow

Precision

Minimal controls

Premium Products

Simple typography

Large spacing

Soft shadows

Focused content

Motion

Everything feels

Heavy

Smooth

Natural

Purposeful

Avoid

Excessive gradients

Busy backgrounds

Overlapping effects

Large borders

Random colors

6. Design Tokens

Every UI element should derive values from reusable design tokens.

Never hardcode values inside components.

Token Categories
Color Tokens

Used for

Backgrounds

Buttons

Cards

Text

Borders

Glow

Typography Tokens

Used for

Display

Heading

Section Title

Body

Caption

Labels

Spacing Tokens

Used for

Margin

Padding

Section spacing

Grid spacing

Radius Tokens

Used for

Buttons

Cards

Inputs

Images

Shadow Tokens

Used for

Cards

Navigation

Floating Elements

Glass Components

Motion Tokens

Used for

Animation Duration

Delay

Easing

Hover

Scroll

Blur Tokens

Used for

Glass

Navigation

Cards

Video Overlay

Opacity Tokens

Used for

Overlays

Glass

Hover States

Backgrounds

Design Token Rules

Components must never contain magic numbers.

Instead of

padding:22px;

Use

space-lg

Instead of

border-radius:19px;

Use

radius-lg

Instead of

color:#00E8FF;

Use

primary

The implementation layer (Tailwind config or CSS variables) will map these tokens to actual values.
7. Color System
Color Philosophy

Project NOVA uses a restrained palette.

The interface should feel premium through contrast, spacing, and lighting—not through excessive color.

Color has one purpose:

Guide attention.

Not decorate.

Primary Palette
Token	Value	Usage
color.background	#020617	Main page background
color.surface	#0F172A	Cards, panels
color.surfaceAlt	#1E293B	Elevated surfaces
color.overlay	rgba(2,6,23,.65)	Video overlay
Accent Palette
Token	Value	Usage
color.primary	#00E5FF	Primary highlights
color.secondary	#7C3AED	Secondary glow
color.success	#14F195	Status indicators
color.warning	#FACC15	Warnings
color.error	#EF4444	Errors
Typography Colors
Token	Value
text.primary	#F8FAFC
text.secondary	#CBD5E1
text.tertiary	#94A3B8
text.disabled	#64748B
Border Colors
border.primary

rgba(255,255,255,.08)

border.secondary

rgba(255,255,255,.05)

border.active

#00E5FF
8. Typography
Philosophy

Typography communicates confidence.

Large headings.

Short paragraphs.

Generous spacing.

Readable hierarchy.

Font Family
Display

Space Grotesk

Purpose

Hero

Section Titles

Display Text

Body

Inter

Purpose

Paragraphs

Cards

Buttons

Forms

Font Scale
Token	Size	Weight
display-xl	72px	700
display-lg	60px	700
display-md	48px	700
heading-xl	40px	700
heading-lg	32px	700
heading-md	24px	600
body-lg	18px	400
body-md	16px	400
body-sm	14px	400
caption	12px	500
Line Heights
Display

1.1

Heading

1.2

Body

1.6

Caption

1.5
9. Spacing System

Spacing should follow an 8-point grid.

Never invent spacing values.

Spacing Tokens
Token	Value
space.1	4px
space.2	8px
space.3	12px
space.4	16px
space.5	20px
space.6	24px
space.8	32px
space.10	40px
space.12	48px
space.16	64px
space.20	80px
space.24	96px
space.32	128px
Section Padding

Desktop

padding-top

120px

padding-bottom

120px

Tablet

96px

Mobile

72px
10. Layout System
Maximum Width
1440px
Content Width
1280px
Reading Width
760px
Container
Width

100%

Max Width

1280px

Margin

Auto

Horizontal Padding

24px
11. Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns
Gap

Desktop

32px

Tablet

24px

Mobile

16px

12. Border Radius
Token	Value
radius.sm	8px
radius.md	16px
radius.lg	24px
radius.xl	32px
radius.full	9999px
13. Shadow System

Project NOVA avoids heavy shadows.

Use subtle depth.

Elevation 1
0 4px 20px rgba(0,0,0,.15)
Elevation 2
0 10px 40px rgba(0,0,0,.25)
Elevation 3
0 20px 60px rgba(0,0,0,.35)
14. Glassmorphism

Glass should enhance readability.

Never reduce contrast.

Glass Card
Opacity

5%

Blur

16px

Border

1px rgba(255,255,255,.08)
Navigation Glass
Opacity

10%

Blur

24px
Hero Overlay
rgba(2,6,23,.65)
15. Glow System

Glow is used sparingly.

It highlights interaction—not decoration.

Primary Glow
0 0 20px rgba(0,229,255,.35)
Secondary Glow
0 0 24px rgba(124,58,237,.30)
Hover Glow

Applied only to:

Buttons
Active cards
Navigation indicator
Scroll indicator

Never apply glow to body text.

16. Elevation Rules

Only interactive elements increase elevation.

Static content remains visually grounded.

Elevation should communicate hierarchy, not decoration.
17. Component Library
Philosophy

Every component should be

Reusable
Predictable
Accessible
Responsive
Consistent

No component should solve more than one problem.

Every component should have a single responsibility.

UI Components
Button

Container

GlassCard

SectionTitle

Badge

Tag

Divider

GlowLine

IconButton

ScrollIndicator

LoadingSpinner
Layout Components
Navbar

Footer

Loader

SectionWrapper
Section Components
Hero

About

Skills

Projects

Contact
18. Button System

Buttons are primary interaction elements.

Buttons should never dominate the interface.

Button Variants
Primary

Purpose

Main actions

Examples

View Projects

Download Resume

Get In Touch

Style

Filled
Cyan Glow
Rounded
Medium Shadow
Secondary

Purpose

Alternative actions

Examples

Learn More

View Skills

Style

Outline

Transparent

Ghost

Purpose

Low priority actions

Transparent

No background

Border only on hover

Icon Button

Purpose

Social Links

GitHub

LinkedIn

Email

Circular

Button Sizes
Token	Height
Small	40px
Medium	48px
Large	56px
Hover Behaviour

Primary

↓

Glow increases

↓

Moves upward 2px

↓

Transition 300ms

Disabled

Opacity

40%

No hover

Cursor

Not Allowed

Accessibility

Minimum height

44px

Visible Focus Ring

Keyboard Accessible

19. Card System

Cards organize information.

Cards create hierarchy.

Card Variants
Glass Card

Used in

About

Contact

General Information

Skill Card

Contains

Icon

Skill Name

Level

Category

Project Card

Contains

Image

Title

Description

Technology

Buttons

Mission Card

Used for timeline

Achievements

Future Experience

Card Behaviour

Hover

↓

Elevation

↓

Border Glow

↓

Subtle Scale

1.02

Never exceed

1.05

20. Navigation System

Navigation should remain invisible until needed.

Behaviour

Fixed

Top

Transparent

Glass Background

Blur

24px

Scroll

At top

Transparent

After scrolling

Glass Background

Shadow

Mobile

Hamburger

Fullscreen Menu

Smooth Animation

Navigation Items
Home

About

Skills

Projects

Contact
Active Item

Underline

Glow

Color Transition

21. Hero System

Hero is the most important section.

It defines the identity of Project NOVA.

Layout
Background Video

↓

Dark Overlay

↓

Initialization Text

↓

Heading

↓

Subtitle

↓

CTA

↓

Scroll Indicator
Heading

Maximum

2 lines

Center aligned

Large Display

Subtitle

Maximum

2 lines

Readable

High Contrast

CTA

Primary Button

Scroll Indicator

Hero Height

100vh

Always

22. Forms

Minimal

Modern

Readable

Input

Rounded

Glass Background

Soft Border

Focus

Primary Glow

No sudden color changes

Labels

Always visible

No placeholder-only fields

Buttons

Use Primary Button

23. Video System

Videos define depth.

Videos never compete with content.

Rules

Muted

Loop

Optimized

MP4

High Quality

Overlay

Always

65%

Dark

Transition

Crossfade

800ms

Position

Fixed

Behind UI

24. Motion Language

Motion communicates.

Never decorate.

Motion Principles

Heavy

Smooth

Elegant

Purposeful

Natural

Avoid

Bounce

Shake

Spin

Fast Zoom

Flash

25. Animation System
Standard Duration

Fast

200ms

Normal

400ms

Slow

800ms

Hero

1200ms

Standard Easings
power2.out

power3.out

expo.out
Scroll Animation

Fade

Slide

Reveal

Glow

Scale

Hover Animation

TranslateY

↓

-2px

Scale

↓

1.02

Shadow

↓

Increase

Loading Animation

Simple

Elegant

No excessive movement

26. Responsive System

Desktop

1440+

Laptop

1024+

Tablet

768+

Mobile

360+

Rules

Grid collapses naturally

Typography scales

Cards stack

Navigation changes

Spacing reduces proportionally

27. Accessibility

Contrast

WCAG AA

Keyboard Navigation

Required

Focus States

Visible

Motion

Respect reduced-motion preferences

Semantic HTML

Required

Alt Text

Required

28. Code Standards

Every component should

Have one responsibility
Be reusable
Avoid duplicate logic
Be easy to test
Use descriptive names
Folder Convention
Hero/

Hero.jsx

index.js

Future files

HeroAnimations.js

Hero.constants.js
29. Naming Convention

Components

PascalCase

GlassCard

SectionTitle

PrimaryButton

Functions

camelCase

handleScroll

playVideo

toggleMenu

Constants

UPPER_CASE

NAV_ITEMS

SOCIAL_LINKS

CSS Variables

--color-primary

--space-8

--radius-lg
30. Future Expansion

The design system should support

Light Theme
Three.js
AI Assistant
Blog
Dashboard
CMS
Internationalization
Additional Themes

without breaking the existing architecture.

Final Design Principles

Every future component should satisfy these questions before implementation:

1. Does it improve the user experience?

If not, remove it.

2. Is it consistent with the design system?

If not, redesign it.

3. Can it be reused?

If not, reconsider the implementation.

4. Is it accessible?

If not, fix accessibility first.

5. Does it support the story of Project NOVA?

If not, it doesn't belong.