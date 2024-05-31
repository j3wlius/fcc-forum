const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';

const forumTopicUrl = 'https://forum.freecodecamp.org/t/';

const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';

const avatarUrl = 'https://sea1.discourse-cdn.com/freecodecamp';

const postsContainer = document.getElementById('posts-container');


// function to return time for last activity on post
const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);

  const minutesPassed = Math.floor((currentTime - lastPost) / 60000);
  const hoursPassed = Math.floor((currentTime - lastPost) / 3600000);
  const daysPassed = Math.floor((currentTime - lastPost) / 86400000);

  if (minutesPassed < 60) {
    console.log(`${minutesPassed}m ago`);
  } else if (hoursPassed < 24) {
    console.log(`${hoursPassed}h ago`);
  } else if (daysPassed < 30) {
    console.log(`${daysPassed}d ago`);
  }
};


// const currentDate = new Date();

// const newTime = new Date(currentDate.getTime() - 12 * 24 * 88 * 60 * 1000);
// timeAgo(newTime)


// function to convert views to K if greater than 1000
const convertViews = (views) => {
  if (views > 1000) {
    return `${Math.floor(views / 1000)}K`;
  }
  return views;
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch (err) {}
};

const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;
  postsContainer.innerHTML = topics
    .map((item) => {
      const {
        id,
        title,
        views,
        posts_count,
        slug,
        posters,
        category_id,
        bumped_at,
      } = item;

      return `<tr>
                <td>
                    <p class='post-title'>${title}</p>
                </td>
                <td></td>
                <td>
                    ${posts_count - 1}
                </td>
                <td>
                    ${convertViews(views)}
                </td>
                <td></td>
            </tr>`;
    })
    .join('');
};

fetchData();
