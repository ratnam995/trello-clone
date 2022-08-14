# Trello Clone

This project is implemented as part of coding challenge for MyBuilder Core team. This was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this in local?

In the project directory, you can run:

### `npm install`

This will install all the required dependencies to run this project.
PS: I have used react-router v6 for setting up routes in this project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Information about the app

### App Layout

- The app layout comprises of 2 parts:
    - App header
    - App body
- All the routes (or pages) are rendered in the App body.

### App Routes

This App contains 2 routes (or pages):
#### Home

- Can be accessed on `http://localhost:3000`.
- It has a button to add a new board.
    - This button opens up a Modal, which has a form to setup a new board.
    - Once the new board's setup is saved, user automatically gets redirected to the new board page.
- Below the button, there is a list which displays all the saved boards.
    - User can click on the specific board from the list to open it.

#### Board

- Can be accessed on `http://localhost:3000/board/:id`.
- This page is divided into 2 parts:
    - Board detail
        - Board detail contains:
            - Board title
            - Board description
        - Board detail can be edited by clicking on the `Edit board details` button.
        - Form is same as the one which was used to setup the board.
    - Actual Board
        - This contains various columns.
            - For a new board, there is no column.
        - User can add a column by entering the column title and then saving it.
        - Each column which is saved (setup) can have cards.
            - Card are sorted in order of high to low priority (i.e. P0 cards will appear on the top).
            - A card form is present at the last of each column, after every card present in the column.
                - If there are no cards in the column then the card form will appear on the top.
            - User can set following properties to a card:
                - Card title
                - Card priority (P0 - P5)
                - Card description
            - For each saved card, there are 3 actions a user can perform:
                - Move
                    - User can move the card from one column to another by clicking on arrow buttons at the bottom of the card. There are 2 arrow buttons:
                        - Left arrow button moves card to the left column (if present)
                        - Right arrow button moves card to the right column (if present)
                    - User can also change the column of the card, by choosing the appropriate column from the dropdown at the bottom of the card (between both arrow bottons).
                - Edit
                    - User can edit any card, by clicking the `Edit` button (present at the bottom of each saved card).
                    - The card gets converted into a form, user can edit the form as needed.
                    - User can also cancel editing a card.
                - Delete
                    - User can also delete any card.
                    - There is a confirmation pop up before deleting a card.
### State management

This app uses a mixture of context API (for maintaing board detail) and component's local state.

## Other important features, to make this production ready

- Collaboration
    - Although this app can still be used as an individual (and advance) ToDo app setup in local.
    - But I think one of the important features of such app is to collaborate with your peers.
    - Some features could be:
        - Ability to setup workspace for your team.
        - Ability to invite people to workspace and to boards as needed.
        - Collaboration on cards:
            - Comments
            - Follow/Unfollow for notifications
            - Reactions
- Better card configurability
    - I think the cards can have more features like:
        - Markdown for descrioption
        - Ability to add attachement
        - Due date
        - Check lists
        - Assginee
    - Connecting 2 cards:
        - There can be different relation between any 2 cards:
            - parent <> child
            - blocked by
            - sub task
- UX
    - Responsive and eye caching design
    - Proper validation on all the forms.
    - Ease of use:
        - Drag and drop feature for cards and columns.
        - Icons, instead of text buttons for edit, delete, save, etc (saves space and looks cool)
    - Transitions on different UI changes.
- Templates
    - Ability to save board and card templates to reuse them later.
- Email/Slack/Whatsapp integration
    - For notifications about:
        - Changes on tickets (which user is watching, i.e. following)
        - Reminders for due dates
        - Custom reminders.
- Automated workflows
    - Marking checklists done moves card to the relevant column.
    - Sending notifications to different channels.


## Important changes in the code/architecture, to make this production ready

- Proper state management
    - This app (right now) lacks a proper state management.
    - It can be optimised and cleaned by setting up some state management library (or creating one in house).
- Models
    - Right now the board, columns and cards are all tightly coupled in a single object.
    - Ideally, we should break into different models:
        - Board
            - id
            - title
            - description
            - createdAt
            - updatedAt
            - Anything else
        - Column
            - id
            - boardId
            - title
            - position
            - Anything else
        - Card
            - id
            - columnId
            - title
            - description
            - priority
            - Anything else
    - This will enable us to write more optimised code (both in BE and FE).
- More of shared code
