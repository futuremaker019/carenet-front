import React, {useRef, useState} from 'react';
import {CONTENT_CATEGORY} from "../support/constants/constans.js";
import {api} from "../service/instance.js";
import PropTypes from "prop-types";
import {Editor} from "@tinymce/tinymce-react";

const CustomEditor = ({contentId, defaultValue, save, cancel}) => {
    const [value, setValue] = useState(defaultValue);
    const editorRef = useRef(null);

    const imageUploadHandler = async (blobInfo, _progress) => new Promise(success => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob());

        const data = {contentId: contentId, contentCategory: CONTENT_CATEGORY.QUESTION};
        formData.append("requestDto", new Blob([JSON.stringify(data)], { type: "application/json" }))

        api.post(`/upload`, formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                setTimeout(() => {
                    _progress(response.data.result.location)
                    success(response.data.result.location);
                }, 1000);
            })
            .catch(error => {
                console.log(error)
                // failure(error.response.data);
            });
    });

    const onEditorChange = (editorValue) => {
        setValue(editorValue);
    };

    const saveValue = (e) => {
        if (e) {
            if (e.key === 'Enter' && e.shiftKey) {
                save(value);
            }
        } else {
            save(value);
        }
    }

    return (
        <div className={""}>
            <Editor
                id="tinyEditor"
                apiKey="g3k5ybg295x9w8ktgmkbj1x1kark3l49tcw5q9vaph4lwlu1"
                init={{
                    plugins: [
                        'emoticons', 'image', 'lists',
                        // 'tinycomments', 'anchor', 'autolink',
                        // 'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist', 'link', 'charmap',
                        // 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'permanentpen',
                        // 'footnotes', 'advtable', 'advcode', 'editimage', 'tableofcontents',
                        // 'mergetags', 'powerpaste', 'tinymcespellchecker', 'autocorrect', 'a11ychecker',
                        // 'typography', 'inlinecss',
                    ],
                    toolbar:
                        'undo redo | blocks fontfamily fontsize forecolor | bold italic underline strikethrough | link image table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    automatic_uploads: true,
                    file_browser_callback_types: 'image',
                    images_upload_handler: imageUploadHandler,
                    language: 'ko_KR',
                    min_height: 200,
                    convert_urls: false
                }}
                initialValue={defaultValue}
                onEditorChange={onEditorChange}
                ref={editorRef}
            />
            <div className={`flex justify-end p-3 gap-4 w-full`}>
                <button type={'button'} className="btn btn-outline btn-accent w-[5rem]"
                        onKeyDown={(e) => saveValue(e)}
                        onClick={() => saveValue()}
                >
                    수정
                </button>
                <button type={'button'} className="btn btn-outline w-[5rem]" onClick={cancel}>취소</button>
            </div>
        </div>
    );
};

export default CustomEditor;

CustomEditor.propTypes = {
    contentId: PropTypes.number,
    defaultValue: PropTypes.string,
    save: PropTypes.func,
    cancel: PropTypes.func,
}