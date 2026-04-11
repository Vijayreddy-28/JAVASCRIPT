# Infinite Scrolling Content Loader

## Objective

Create a web page that loads additional content as the user scrolls toward the bottom.

## Requirements

- Detect when the user is near the bottom of the page using the scroll event.
- Use the Fetch API to load more data asynchronously (simulate with dummy data or an API).
- Append new content to the page while ensuring smooth performance and user experience.

### Screenshot Outputs

#### 1

![output](output/t91.png)

#### 2

![output](output/t93.png)

#### 3

![output](output/t92.png)

#### 4

![output](output/t94.png)

#### The reason for API call mismatch is caused by:

- Multiple scroll events triggering multiple overlapping fetch requests before the previous one completes, combined with uncontrolled page increments.
