import {
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_USER_POSTS,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED
} from '../actions'

// If availabile pull posts from local storage
let posts = []

if (localStorage.getItem('posts')) {
  posts = JSON.parse(localStorage.getItem('posts'))
}

const initialState = {
  posts: posts,
  userPosts: [],
  isLoadingPosts: false,
  isLoadingUserPosts: false,
  isAddingPost: false,
  errorMessage: null
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // POSTS ===============================|
    // =====================================|
    // GET_POSTS ---------------------------|
    case GET_POSTS_START: {
      return {
        ...state,
        isLoadingPosts: true
      }
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        isLoadingPosts: false
      }
    }
    case GET_POSTS_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isLoadingPosts: false
      }
    }
    // GET_USER_POSTS -----------------------|
    case GET_USER_POSTS: {
      // Filter posts by loggedin user's id
      const userPosts = state.posts.filter(post => {
        return post.user_id === Number(action.payload)
      })

      return {
        ...state,
        userPosts
      }
    }
    // ADD_POSTS ---------------------------|
    case ADD_POST_START: {
      return {
        ...state,
        isAddingPost: true
      }
    }
    case ADD_POST_SUCCESS: {
      // Update Local Storage with new post
      localStorage.setItem(
        'posts',
        JSON.stringify(state.posts.concat(action.payload))
      )

      return {
        ...state,
        posts: state.posts.concat(action.payload),
        userPosts: state.userPosts.concat(action.payload),
        isAddingPost: false
      }
    }
    case ADD_POST_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isAddingPost: false
      }
    }
    default:
      return state
  }
}
