import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TagBox from "../../components/write/TagBox";
import { changeField } from "../../modules/write";
import { RootState } from "../../modules";

function TagBoxContainer() {
  const dispatch = useDispatch();
  const tags = useSelector(({ write }: RootState) => write.tags);

  const onChangeTags = (nextTags: string[]): void => {
    dispatch(
      changeField({
        key: "tags",
        value: nextTags,
      })
    );
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
}

export default TagBoxContainer;
