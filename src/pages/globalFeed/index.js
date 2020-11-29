import React, {useEffect, Fragment} from 'react'
import {stringify} from "query-string";

import useFetch from 'hooks/useFetch'
import Feed from "../../components/feed"
import Pagination from 'components/pagination'
import {getPaginator, limit} from "../../utils";
import PopularTags from 'components/popularTags'
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import FeedToggler from "components/feedToggler"

const GlobalFeed = ({location, match}) => {
    const {offset, currentPage} = getPaginator(location.search)
    const stringifyedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles?${stringifyedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const url = match.url

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>
                    <h1>Udivi</h1>
                    <p>chto nibyd</p>
                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                    <div className='col-9'>
                        <FeedToggler/>
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles}/>
                                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage}/>
                            </Fragment>
                        )}
                    </div>
                    <div className='col-3'>
                        <PopularTags/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalFeed
