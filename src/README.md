# Developers notes

## **Next issues**
### In regards to building the **timeline**:
- [ ] Need to figure out a way to display all the instances position in the timeline. Current problem is that a few timestamps are way too close to each other (taken almost instantly after each other, it's not spread out evenly). Guess I have to create different scales in a same timeline (ie.if distance between array[a] and array[b] < 20px, then create a minimum separation between to instances)
- [ ] Decide who is the source of truth

WHAT DO I NEED TO MAKE THE TIMELINE WORK:

- timeline should show **all instances** in a scrollable line
- function that takes the scrollPosition (in pixels) and transforms it into currentTimestamp (miliseconds)
- function that can pass currentTimestamp as a prop to the parent component (ElementScreen)
- function that 


## Tasks of milestone Rock #1
- [x] create `getElementIndexByID()`  (to get the position inside)
- [ ] `onClick` element > for loop > go through obj ID

## Ideas

- Ability to **group** different **elements** into a **project**
- Quick access to take new picture from an element of a project
- Create **templates** of different views of an element Screen
- QR sticker downloadable (and explained)
- Reminder
- export / import files

