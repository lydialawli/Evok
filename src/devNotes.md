# Developers notes

## **Next issues**
### In regards to building the **timeline**:
- [x] Need to figure out a way to display all the instances position in the timeline. Current problem is that a few timestamps are way too close to each other (taken almost instantly after each other, it's not spread out evenly). Guess I have to create different scales in a same timeline (ie.if distance between array[a] and array[b] < 20px, then create a minimum separation between to instances)
- [x] Decide who is the source of truth => Timeline

WHAT DO I NEED TO MAKE THE TIMELINE WORK:

- [x] create fake array (mock data) to use it in timeline
- [x] divide TImeline component into 2 parts (TLDisplay and TLSroll) in seperate files 
- [x] add props when calling Timeline
- [x] add TLDisplay props, should receive 
    - data
    - currentTimestamp (in ms)
    - mode (vertical or horizontal)
    - style
    - scale (to later change from ms to px and viceversa)
- [x] add TLScroll props, should receive 
    - data
    - currentTimestamp (in ms)
    - mode (vertical or horizontal)
    - style
    - scale (to later change from ms to px and viceversa)
    - onTLchange()
    - onScrollChange(this.props.scrollPosition) //this function will pass an argument to the parent component(ElementScreen)
- [x] experiment with Flatlist insteasd of ScrollView
- [x] timelineDisplay working well
    - [x] show all instances
    - [x] create proper array example
    - [x] when currentTimestamp changes (given through parent as prop) the bar changes position (left-right)

- [ ] create a placeholder if element has no item yet (in flatlist component)
- [ ] fix Gallery screen
- [ ] make sure switching screens works well
- [ ] add drawer to SettingScreen (create setting screen with one button (switch))







## Ideas

- Ability to **group** different **elements** into a **project**
- Quick access to take new picture from an element of a project
- Create **templates** of different views of an element Screen
- QR sticker downloadable (and explained)
- Reminder
- export / import files

