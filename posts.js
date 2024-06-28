class Post {
    constructor(userId, title, body) {
      this.userId = userId;
      this.title = title;
      this.body = body;
      this.name = this.getNameFromId(userId);
    }

    getNameFromId(userId) {
      const names = {
        1: 'Athota Srilatha',
        2: 'Bandaru Sampath Kumar',
        3: 'Gollakaram Ganga Bhavani',
        4: 'Gowtham Meka',
        5: 'Mayuraj Ranawat',
        6: 'Narendiran K',
        7: 'Pratham Madhunapanthula',
        8: 'Riya Reddy',
        9: 'Shaik Sameer',
        10: 'Suriyan K',
        11: 'Vaishnavi Panta',
        12: 'Yateesh Tangudu',
      };

      return names[userId] || 'Unknown';
    }

    displayRow() {
      return `
      <tr id="post-row-${this.userId}">
          <td>${this.userId}</td>
          <td>${this.name}</td>
          <td>${this.title}</td>
      </tr>
      `;
    }
  }

  async function fetchAndDisplayPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const postsTableBody = document.getElementById('posts-table-body');
      postsTableBody.innerHTML = '';

      const uniquePosts = {};

      // Updating the data with properties from Post class
      data.forEach(post => {
        const postObject = new Post(post.userId, post.title, post.body);
        uniquePosts[postObject.userId] = postObject;
      });

      // Displaying the data in the table
      for (let userId in uniquePosts) {
        const post = uniquePosts[userId];
        postsTableBody.innerHTML += post.displayRow();
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);
  document.getElementById('update-data').addEventListener('click', fetchAndDisplayPosts);

  // Search button functionality
  document.getElementById('search-button').addEventListener('click', function() {
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();
    const postsTableBody = document.getElementById('posts-table-body');
    const rows = postsTableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
      const nameCell = row.getElementsByTagName('td')[1]; // Assuming name is the second column
      if (nameCell) {
        const name = nameCell.textContent.trim().toLowerCase();
        if (name.includes(searchValue)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  });