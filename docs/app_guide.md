# Project Overview

## Project Description
This is a task management system application built using React with Vite as the build tool and Tailwind CSS for styling.

## Tools Used
- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.
- **Shadcn-ui**: UI component library for React.
- **Lucide-icons**: Icon library for React applications.

## App Guidelines

1. **Components**:
  - All components should be modular and reusable.
  - Components should follow the Single Responsibility Principle (SRP).
  - **Badge Component**: A reusable badge component that can be used to display text with various colors and styles.

2. **Styling**:
  - Use Tailwind CSS classes to style components.
  - Avoid inline styles unless necessary.

3. **State Management**:
  - Use React's built-in state management for simple applications.
  - For more complex applications, consider using a state management library like Redux or Context API.

4. **Navigation**:
  - Implement navigation using React Router or Vite's routing capabilities.

5. **Testing**:
  - Write unit tests for components and hooks using Jest and React Testing Library.
  - Ensure full coverage of your application.

6. **Code Formatting**:
  - Use Prettier for consistent code formatting.
  - Configure Prettier to work with ESLint for linting.

7. **Version Control**:
  - Commit changes with descriptive messages.
  - Follow Git best practices, such as feature branches and pull requests.

8. **Documentation**:
  - Document all public APIs and components.
  - Use JSDoc for JavaScript documentation.

9. **Updating the Guide**:
  - Verify and update the guide after each update or change to the application.

## Roadmap / Task Control

- [x] Design System (UI Kit)
 - [ ] Create color palette
 - [ ] Establish typography guidelines
 - [ ] Define spacing rules

- [x] Authentication
 - [ ] Implement login functionality
 - [ ] Implement registration functionality
 - [ ] Add password reset feature

- [x] Task Management
 - [x] Create task list component (dummy data)
 - [x] Implement task creation form
 - [x] Mark tasks as completed (checkbox toggle)
 - [x] Delete a task
 - [x] Filter or sort tasks (e.g., by priority, due date, or status)
 - [X] Store tasks in localStorage (before backend integration)
 - [ ] Implement task editing functionality

- [ ] Dashboard
 - [ ] Design and implement the dashboard layout
 - [ ] Display user-specific data
 - [ ] Provide visualizations (e.g., charts, graphs)

- [x] Dark Mode Implementation
  - [X] Add dark mode toggle functionality to the application.
  - [X] Apply dark mode styles using Tailwind CSS.

- [x] Local Storage Integration
  - [x] Ensure local storage is working for storing tasks.
  - [x] Add functionality to save and load tasks from local storage.

## Additional Features Completed
- [x] Created an App icon
- [x] Modified layout to keep focus on completing tasks
- [x] Filters moved to the left
- [x] Header sticky and dynamic on scroll
- [x] Dynamic logo component
- [x] Created a custom Task Card

## New Features Added
- **Expandable Form**: Add functionality to expand the task creation form when typing starts in the input field.
- **Automatic Text Field Focus on Typing**: Automatically focus on the task creation input field when starting to type.
- **Filter Bar Integration**: Integrated a filter bar using the PopOver component from Shadui for filtering tasks by status and priority.