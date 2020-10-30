import React, {useEffect, useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import ArticleForm from '../../components/articleForm'
import useFetch from "../../hooks/useFetch"
import {CurrentUserContext} from "../../contexts/thisUser";

const EditArticle = ({match}) => {
    const slug = match.params.slug
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse , error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValue, setInitialValue] = useState(null)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)


    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }

        setInitialValue({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    }, [fetchArticleResponse])

    const handleSubmit = article => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!updateArticleResponse){
            return
        }
        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false){
        return <Redirect to='/'/>
    }

    if (isSuccessfullSubmit) {
        return <Redirect to={`/articles/${slug}`}/>
    }

    return (
        <ArticleForm
            onSubmit = {handleSubmit}
            errors = {(updateArticleError && updateArticleError.errors) || {}}
            initialValue = {initialValue}
        />
    )
}

export default EditArticle
