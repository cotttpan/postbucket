import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from './../../mutation/index';

/* Container
--------------------------- */
const mapStateToProps = (store: IAppStoreFromProvider) => {
    const { currentTopicId, currentProjectId } = store.session;
    const currentProject = store.projects[currentProjectId || ''];
    const currentTopic: IEntity.ITopic | undefined = currentProject && currentProject.topics[currentTopicId || ''];
    const posts: IEntity.IPost[] = currentTopic ? Object.values(currentTopic.posts) : [];

    return {
        posts
    };
};

const mapDispatchToProps = (usecase: UseCase) => ({
    actions: {
        setPostToEditor: usecase('POST::SET_EDITOR').use<IEntity.IPost>([


        ]),

        deletePost: usecase('POST::DELETE').use<IEntity.IPost>([
            Project.deletePost,
        ])
    }
});

/* TopicPane
-------------------------------- */
import PostView from './PostView';

type PostAction = (post: IEntity.IPost) => void;

interface Props {
    posts: IEntity.IPost[];
    actions: {
        setPostToEditor: PostAction;
        deletePost: PostAction;
    };
}

export class TopicPane extends React.Component<Props, {}> {
    render() {
        const {actions} = this.props;

        return (
            <div className='TopicPane'>
                <div className='PostList'>
                    {
                        this.props.posts.map(post =>
                            <PostView
                                key={post.id}
                                post={post}
                                onSelect={actions.setPostToEditor}
                                deletePost={actions.deletePost}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPane);
