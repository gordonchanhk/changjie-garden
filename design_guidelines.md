# Design Guidelines: Changjie Typing Garden Game

## Design Approach

**Reference-Based Approach**: Drawing inspiration from kid-friendly educational games like Duolingo Kids, Khan Academy Kids, and casual mobile games like Fruit Ninja. The design prioritizes playful engagement, clear visual feedback, and intuitive mobile interactions for children.

**Core Principles**:
- Immediate visual clarity for young learners
- Playful garden aesthetic with fruit-character integration
- Mobile-first touch interactions
- Celebratory feedback for learning moments

## Typography

**Primary Font**: Rounded sans-serif from Google Fonts (e.g., Quicksand, Fredoka)
- Game Score: 4xl to 6xl, extra bold
- Falling Characters: 3xl to 5xl, bold (large enough for kids to read clearly)
- Input Field: 2xl to 3xl, medium weight
- UI Labels: lg to xl, medium

**Chinese Characters**: Noto Sans SC via CDN for clear, kid-friendly simplified Chinese rendering

## Layout System

**Spacing Framework**: Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Component padding: p-4 to p-6
- Section gaps: gap-4 to gap-6
- Screen margins: mx-4 to mx-6

**Mobile-First Grid**:
- Full viewport game area (100vh) with natural content flow
- Fixed header (score display)
- Scrollable garden background
- Fixed bottom input area
- Z-index layers: Background (0) → Falling characters (10) → Input UI (20) → Feedback overlays (30)

## Component Library

### Header Bar
- Floating rounded container at top
- Score counter with large numerals
- Small pause/settings icon button
- Subtle shadow for depth

### Game Canvas
- Full-height central play area
- Relative positioning container for falling characters
- Overflow hidden to clip characters at boundaries
- Touch-friendly (no accidental scrolling)

### Falling Character Elements
- Rounded fruit-shaped containers (80px - 120px diameter)
- Large Chinese character centered inside
- Smooth drop animation (3-5 seconds per fall)
- Fruit variety: apple, orange, watermelon, grape shapes (SVG icons from Heroicons or Font Awesome)
- Wobble animation during fall for playfulness

### Input Area (Fixed Bottom)
- Rounded panel elevated above background
- Large input field (h-16 minimum) with rounded corners
- Clear visual focus state (thick border)
- Submit button (if needed) as rounded icon button
- Soft shadow for elevation

### Feedback Overlays
- Success: Bouncy confetti burst animation at match point
- Miss: Gentle shake animation
- Point popup: +1, +5 floating numbers that fade up
- Level complete: Full-screen celebration modal

### Garden Background
- Layered parallax effect (optional depth)
- Illustrated garden scene with ground, sky, plants
- Soft, non-distracting visual treatment
- Characters appear from "sky" area, land at "ground" baseline

## Images

**Hero/Background Image**: 
- Full-screen garden illustration (whimsical, cartoon style)
- Elements: grass ground, blue sky with clouds, simple trees/bushes
- Serves as permanent game background
- Low visual complexity to avoid distraction from falling characters

**Fruit Icons**: 
- Use icon library (Font Awesome fruit icons) or simple SVG shapes
- Rendered as colorful containers for Chinese characters
- 6-8 fruit varieties for visual variety

## Interaction Patterns

**Mobile Touch Optimization**:
- Input field auto-focuses on game start
- Large tap targets (minimum 48px)
- Swipe to dismiss modals
- No hover states (mobile-first)

**Game Flow**:
1. Start screen: Simple "Start Game" button over garden scene
2. Active game: Characters spawn and fall continuously
3. Match feedback: Immediate visual celebration
4. Miss consequence: Character reaches bottom, gentle feedback
5. Pause state: Frosted overlay with resume/restart options

**Animations** (Purposeful Only):
- Character falling: Smooth linear descent with slight rotation
- Match success: Scale up + fade out character, confetti burst
- Score increment: Bouncy number animation
- Missed character: Sad emoji or small cloud puff at ground level

## Responsive Behavior

**Mobile (Base - 375px+)**:
- Single column, full viewport game
- Input area: 20% bottom screen
- Game canvas: 70% middle screen  
- Header: 10% top screen

**Tablet (768px+)**:
- Wider game canvas (max-w-2xl centered)
- Increased character sizes
- Side decorative elements allowed

## Accessibility

- High contrast between characters and fruit backgrounds
- Large, legible typography for young readers
- Clear focus indicators on input field
- Sound effects paired with visual feedback (audio library integration)
- Keyboard support for desktop practice

## Technical Constraints

- Use Heroicons or Font Awesome for fruit/UI icons via CDN
- Google Fonts for typography
- CSS animations (no heavy JS libraries for simple effects)
- Touch event handlers optimized for mobile
- LocalStorage for high score persistence

---

**Design Philosophy**: Create a joyful, pressure-free learning environment where typing practice feels like play. Every interaction celebrates progress with delightful, age-appropriate feedback that builds confidence in young learners.