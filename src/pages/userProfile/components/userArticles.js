import React, {useEffect, Fragment} from 'react'
import {stringify} from "query-string";

import {getPaginator, limit} from "../../../utils";
import useFetch from "../../../hooks/useFetch"
import ErrorMessage from "../../../components/errorMessage";
import Loading from "../../../components/loading";
import Feed from "../../../components/feed";
import Pagination from "../../../components/pagination";

const getApUrl = ({username, offset, isFavorites }) => {
    const params = isFavorites
        ? {limit, offset, favorited: username}
        : {limit, offset, author: username}

        return `/articles?${stringify(params)}`
}

const UserArticles = ({username, location, isFavorites, url}) => {
    const {offset, currentPage} = getPaginator(location.search)
    const apiUrl = getApUrl({username, offset, isFavorites})
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch, isFavorites])

    return (<div>
        {isLoading && <Loading/>}
        {error && <ErrorMessage/>}
        {!isLoading && response && (
            <Fragment>
                <Feed articles={response.articles}/>
                    <Pagination
                        total={response.articlesCount}
                        limit={limit}
                        url={url}
                        currentPage={currentPage}
                    />
            </Fragment>
        )}
    </div>)
}

export default UserArticles
