import reposService from "../services/repos";
import {
  REPOS_REQUEST,
  REPOS_EMPTY,
  REPOS_SUCCESS,
  REPOS_NOT_FOUND,
  REPOS_ERROR
} from "../constants/ActionTypes";

export const getReposByUserName = async (dispatch, reposService, username) => {
    dispatch({ type: REPOS_REQUEST });

    try {
        const response = await reposService.getReposByUserName(username);
        const repos = response.data;
        const isReposEmpty = repos.length === 0;
        if (isReposEmpty) dispatch({ type: REPOS_EMPTY });
        else
        dispatch({
            type: REPOS_SUCCESS,
            repos
        });
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        if (isError404) dispatch({ type: REPOS_NOT_FOUND });
        else dispatch({ type: REPOS_ERROR });
    }
}

export const getReposByUserNameInjector = dispatch => {
    return username => {
        getReposByUserName(dispatch, reposService, username);
    };
};
