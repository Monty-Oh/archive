import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>새 글 작성하기 - REACTERS</title>
            </Helmet>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButtonContainer />
        </Responsive>
    )
};

export default WritePage;