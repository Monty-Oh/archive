import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));
    
    // 언마운트 되면 리덕스에서 포스트 데이터 삭제
    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    // 보고 있던 포스트 정보를 write 모듈에서 관리하는 상태에 넣는다.
    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write');
    };

    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    }

    // 수정하려는 포스트가 사용자 자신의 포스트인지?
    const ownPost = (user && user._id) === (post && post.user._id);

    return (
        <PostViewer post={post} loading={loading} error={error} 
            actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}
        />
    )
};

export default withRouter(PostViewerContainer);