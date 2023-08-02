# Family Tree 🌳 👨‍👩‍👦

### Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running in dev mode](#running-in-dev-mode)
- [Running Tests](#running-tests)
- [Problem Statement](#problem-statement)
- [Solution Approach](#solution-approach)
- [Folder structure](#folder-structure)
- [Features](#features)
- [Future Improvements](#future-improvements)
- [Tech Stack](#tech-stack)

## Introduction

The Family Tree is a web application built with Typescript, React, Next.js 13, and TailwindCSS. It provides a solution to model the family tree of King Shan using a tree data structure and provides functionality to perform various operations related to the family members and their relationships.

Click here for a [live demo](https://family-tree-ooanishoo.vercel.app/) 👀

## Prerequisites

Before setting up and running the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.18.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1.  Clone the repository to your local machine:

```
git clone https://github.com/ooanishoo/family-tree.git
```

1.  Navigate to the project directory:

```
cd family-tree
```

1.  Install the required dependencies:

```
npm install
```

## Running in dev mode

1.  Start the development server:

```
npm run dev
```

1.  Open your web browser and navigate to `http://localhost:3000` to access the Family Tree application.

## Running Tests

To run all the tests, run the following command:

```
npm test
```

To run a specific test file, pass the relative path to the test file as an argument to the `npm test` command. For example:

```
npm test src/__tests__/pages/models/FamilyTree.test.ts
```

Although FamilyTree.test.ts covers all the test cases for the given problem statement, I have added a solution.test.ts file to run specific test cases matching the four problem statement.

Running the following command will run the test cases for the four problem statements in watch mode.

```
npm run start
```

## Other available scripts

These scripts refer to the different stages of developing an application:

- Build the application for production usage

```
npm run build
```

- Start a Next.js production server. (Make sure to run the build script before running this command)

```
npm run prod
```

- Run pre-commit hook to run linting and formatting checks

```
npm run precommit
```

## Problem Statement

King Shan is the emperor of Lengaburu and has been ruling the planet for the last 350 years. In these problems, you have to write code to model out the family tree of King Shan. There are 4 problems that revolve around the family tree.

- **Problem 1: Meet the Family**  
  Model out the Shan family tree so that when given a `name` and a `relationship` as an input, the outputs are the people that correspond to the relationship.

- **Problem 2: A New Born**  
  There are some expectant mothers in the Shan family. Your code  
  should be able to add a child to a particular family in the tree.

- **Problem 3: The Girl Child**  
  Determine which mother has the most girl children in the family tree.

- **Problem 4: Who's Your Daddy?**  
  Given two names as input, find the relationship between the two individuals in the family tree.

**Relationships to handle**:
There are many relations that could exist, but at a minimum, your code needs to handle these relationships
![Relationships](https://github.com/ooanishoo/ooanishoo/assets/9260574/b278c3bf-94df-44d6-b589-1e9015ca52a2)

## Solution Approach

According to [Wikipedia](https://en.wikipedia.org/wiki/Family_tree),

> "A family tree, also called a genealogy or a pedigree chart, is a chart representing family relationships in a conventional tree structure."

I have chosen a [Tree (data structure)](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) to model the family tree of King Shan and his descendants.

### Why tree data structure?

A tree data structure is a hierarchical data structure that consists of nodes connected by edges. It is a non-linear data structure that allows quicker and easier access to the data. It is a common data structure used to represent an organization tree, family tree, file directory system, and DOM elements in the browser.

Since the challenge requires us to model the family tree and requires to add members, search for members, and determine relationships between members, a tree data structure is the most suitable data structure to represent the family tree.

### Member:

[Member](https://github.com/ooanishoo/family-tree/blob/main/src/models/Member.ts) class represents a node in a tree. It contains the following attributes:

```ts
  name: string
  gender: Gender // MALE or FEMALE
  spouse: Member | null
  children: Member[]
```

### FamilyTree:

[FamilyTree](https://github.com/ooanishoo/family-tree/blob/main/src/models/FamilyTree.ts) class is responsible for managing the family tree data structure and providing various methods to interact with the tree. It leverages the `Member` class to add family members to the tree and uses Breadth-First Search (BFS) to traverse the tree and find the desired family members and their relationships.

### Assumptions:

The solution has been implemented with the following assumptions:

1. To create a new instance of `FamilyTree`, you must provide the name of the father and mother. This will create two members in the tree and will set the father as the root node of the tree.
2. **Only married couples can have a child**: You cannot add a child to a family member if the family member does not have a spouse.
3. **Monogamy**: You cannot add a spouse to a family member if the family member is already married.
4. **Heterosexual marriage**: You can only add an opposite-sex spouse to a family member.

### Folder structure:

Here is an overview of the key folders and their contents:

- `src`: Root directory for the React application source code.
- `__tests__`: Test files for the components, utilities, and model classes.
- `components`: React components that make up the application's user interface.
- `models`: Data models for the family tree.
- `pages`: Holds the main pages of the application.
- `types`: Type definitions and enums.
- `utils`: Contains utility functions and constants.

```
├── src
│   ├── __tests__
│   │   ├── components
│   │   │   ├── AddMember.test.tsx
│   │   │   ├── Avatar.test.tsx
│   │   │   ├── Drawer.test.tsx
│   │   │   ├── FamilyTree.test.tsx
│   │   │   ├── FamilyTreeProvider.test.tsx
│   │   │   ├── Person.test.tsx
│   │   │   ├── SearchMember.test.tsx
│   │   │   └── SearchRelationship.test.tsx
│   │   ├── models
│   │   │   ├── FamilyTree.test.ts
│   │   │   └── Member.test.ts
│   │   └── utils
│   │       └── index.test.ts
│   ├── components
│   │   ├── AddMember.tsx
│   │   ├── Avatar.tsx
│   │   ├── Drawer.tsx
│   │   ├── FamilyTree.tsx
│   │   ├── FamilyTreeProvider.tsx
│   │   ├── Person.tsx
│   │   ├── SearchMember.tsx
│   │   └── SearchRelationship.tsx
│   ├── models
│   │   ├── FamilyTree.ts
│   │   └── Member.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── Gender.ts
│   │   ├── IMember.ts
│   │   └── Relationship.ts
│   └── utils
│       ├── constants.ts
│       └── index.ts
```

## Features

- **Family Tree Hierarchy:** The application provides a beautiful user interface to visualize the family tree of King Shan and his descendants.

- **Add newborn:** You can add a new child to a specific family in the tree.

- **Add a spouse:** You can add a spouse to an unmarried member of the family.

- **Search by Name and Relationship:** You can search for existing family members by name and specify the desired relationship. At the moment, the application supports the following relationships

  ```ts
  export type Relationship =
    | 'PATERNAL-UNCLE'
    | 'MATERNAL-UNCLE'
    | 'PATERNAL-AUNT'
    | 'MATERNAL-AUNT'
    | 'SISTER-IN-LAW'
    | 'BROTHER-IN-LAW'
    | 'COUSIN'
    | 'FATHER'
    | 'MOTHER'
    | 'CHILD'
    | 'SON'
    | 'DAUGHTER'
    | 'BROTHER'
    | 'SISTER'
    | 'GRAND-CHILD'
    | 'GRAND-DAUGHTER'
    | 'GRAND-SON'
    | 'SIBLING'
    | 'SPOUSE'
  ```

- **Determine Relationships:** Given two names, the application can determine the relationship between the two individuals in the family tree. At the moment, the application can find the above relationships as well as additional following relationships

  ```ts
  export type SearchableRelationship =
    | Relationship
    | 'ANCESTOR'
    | 'DESCENDANT'
    | 'COUSIN-IN-LAW'
    | 'FATHER-IN-LAW'
    | 'MOTHER-IN-LAW'
    | 'SON-IN-LAW'
    | 'DAUGHTER-IN-LAW'
  ```

- **Count Girl Children:** Users can determine which mother in the family has the most girl children.

### Future Improvements:

- **Error Handling:** The application does not handle any form errors at the moment due to time constraints. It would be great to add error handling to the application to provide a better user experience.
- **Toast Notifications:** Add toast notifications to notify users of the success or failure of their actions when adding a new member to the family tree.
- **Persistent State:** The application does not persist the family tree data state after adding new members to the tree. Saving tree data in localStorage can help persist the state of the family tree and provide a better user experience.
- **Create new family trees:** The application does not allow users to create a new family tree. It would be great to add a feature to create a new family tree and switch between different family trees.

### Tech Stack

- [Typescript](https://www.typescriptlang.org/): JavaScript with syntax for types
- [React](https://reactjs.org/): The library for building web applications
- [Next.js 13](https://nextjs.org/): The React Framework for the Web. Used `pages` router.
- [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces
- [Garden components](https://garden.zendesk.com/components/): Since I work with garden components at Zendesk, eat your own dog food, right?
- [Jest](https://jestjs.io/): JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): React DOM testing utilities that encourage good testing practices
