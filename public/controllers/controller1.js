console.log(currentUser)

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

// Example: Get the token from a cookie named 'token'
const token = getCookie('token')

document.getElementById('postForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('caption', document.getElementById('caption').value)
    formData.append('image', document.getElementById('image').files[0])

    try {
        const response = await fetch('api/posts/create', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (response.ok) {
            window.location.reload() // Reload the page to see the new post
        } else {
            const data = await response.json()
            console.log('Failed to create post: ' + data.message)
        }
    } catch (err) {
        console.error('Error:', err)
    }
})

document.querySelectorAll('.comments-button').forEach(button => {
    button.addEventListener('click', async function () {
        document.getElementById('comments-dialog').style.display = 'block'
        document.getElementById('comment-backdrop').style.display = 'block'
        const postId = this.dataset.postId

        try {
            const response = await fetch(`/api/posts/${postId}/comments`)
            console.log('thisiis')

            const data = await response.json()
            console.log(data)


            if (data.success) {
                const commentsContent = document.getElementById('comments-content')
                commentsContent.innerHTML = ''

                data.comments.forEach(comment => {



                    const commentWrapper = document.createElement('div')
                    const commentPpCont = document.createElement('div')
                    const commentUserPpContent = document.createElement('div')
                    const commentUserName = document.createElement('p')
                    const UserComment = document.createElement('p')

                    commentUserName.textContent = `${comment.user.username}`
                    UserComment.textContent = `${comment.text}`
                    commentUserPpContent.appendChild(commentUserName)
                    commentUserPpContent.appendChild(UserComment)
                    commentWrapper.appendChild(commentPpCont)
                    commentWrapper.appendChild(commentUserPpContent)
                    commentsContent.appendChild(commentWrapper)
                })

                // Show the dialog
            } else {
                console.log('Failed to load comments')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })
})

document.getElementById('comment-backdrop').addEventListener('click', function () {
    document.getElementById('comments-dialog').style.display = 'none'
    document.getElementById('comment-backdrop').style.display = 'none'
})


document.querySelectorAll('[id^="follow-button-"], [id^="unfollow-button-"]').forEach(button => {
    button.addEventListener('click', async function () {
        const userIdToFollowOrUnfollow = this.id.split('-')[2]
        const isUnfollow = this.id.startsWith('unfollow')
        const form = document.getElementById(`follow-unfollow-form-${userIdToFollowOrUnfollow}`)

        try {
            const response = await fetch(form.action, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (data.success) {
                console.log(`You have ${isUnfollow ? 'unfollowed' : 'followed'} ${data.user.firstname}`)
                this.textContent = isUnfollow ? 'Follow' : 'Unfollow'
                this.id = isUnfollow ? `follow-button-${userIdToFollowOrUnfollow}` : `unfollow-button-${userIdToFollowOrUnfollow}`
            } else {
                console.log(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })
})


document.querySelectorAll('[id^="like-button-"]').forEach(button => {
    button.addEventListener('click', async function (e) {
        console.log(e)

        const postId = this.id.split('-')[2] // Extract the post ID from the button ID
        const form = document.getElementById(`like-form-${postId}`)
        const likeCountSpan = document.getElementById(`like-count-${postId}`)

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace with your JWT token
                }
            })

            const data = await response.json()

            if (data.success) {
                // Update the like button text and count
                console.log(data.post.likes)

                const likeButton = document.getElementById(`like-button-${postId}`)
                likeButton.textContent = data.post.likes.includes(currentUser) ? 'Unlike' : 'Like'
                likeCountSpan.textContent = data.post.likes.length
                console.log(data.post.likes.length)

            } else {
                console.log('Error liking the post: ' + data.message)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })
})

document.querySelectorAll('[id^="delete-post-button-"]').forEach(button => {
    button.addEventListener('click', async function () {
        const postIdToDelete = this.id.split('-')[3]
        const form = document.getElementById(`delete-post-form-${postIdToDelete}`)

        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(form.action, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token if necessary
                    }
                })

                const data = await response.json()

                if (data.success) {
                    console.log('Post deleted successfully')
                    document.getElementById(`delete-post-form-${postIdToDelete}`).parentElement.remove() // Remove the post card from the DOM
                } else {
                    console.log('Error deleting the post: ' + data.message)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    })
});


document.getElementById('notification-icon').addEventListener('click', function () {
    fetch('/acc ount/notifications')
        .then(response => response.json())
        .then(data => {
            const notificationList = document.getElementById('notification-list');
            notificationList.innerHTML = ''; // Clear previous notifications

            data.notifications.forEach(notification => {
                const listItem = document.createElement('li');
                listItem.textContent = `${notification.sender.username} ${getActionText(notification.type)} your post.`;
                notificationList.appendChild(listItem);
            });

            // Show the notification dropdown/modal
            document.getElementById('notification-dropdown').style.display = 'block';
        })
        .catch(err => console.error('Error fetching notifications:', err));
});

function getActionText(type) {
    switch (type) {
        case 'like':
            return 'liked';
        case 'follow':
            return 'followed';
        case 'comment':
            return 'commented on';
        default:
            return '';
    }
}
