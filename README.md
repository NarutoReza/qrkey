# USERS and POSTS website using React.js

To start the website you must clone it first and do a `npm install` to install the dependencies.

I have used axios, react-paginate for pagination, react-toastify for toasters.

After you have installed the packages, run `npm start` to start the server. It will open a localhost with a port of 3000.

As I have understand from the documentation, I have created an users and their posts table.
When you open the site, the index page will have the list of users table.
If you click on anywhere in a row, it will take you to the user's posts page. I have highlighted the user name as a link, for user understandability.

I have called both the APIs initially.
As users APIs gives the users list, I have to call it initially. But the posts API data contains everyone's data, so I have called it initially too, so that I don't have to call it again and again.

Now, when I am sending to the posts page, I am sending the user's post as a state from navigate, but first I am filtering out the clicking user's posts only. Now, if you directly try to go to the page, you won't be able to go. As posts aren't going via state.

There you will be able to see the posts as a table format. Same as user's list table.

I have made the table initially take 5 items per pagination page. You can change the items per page as per the selector, you can change the pages from pagination.

The table has a width of 900px, below that width screen it has a scrolling function, so that the look does not go bad for each column.

Now, to go back to the user's list page from posts list page, you have a `go back` button on top.

I have added a loader before the API fetches the data. If fetches successfully, the data shows. If failed, the table says 'No data available' and a toaster comes up with a error message.