/**
 *
 * QuestionManage
 *
 */
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { memo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from 'reactstrap';
import styled from 'styled-components/macro';

const configToolbar = {
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
};

interface Props {}
export const QuestionManage = memo((props: Props) => {
  const { t } = useTranslation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  const onSave = () => {
    console.log(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
      'editorState',
    );
  };

  return (
    <Div>
      <Title>{t('Question Management')}</Title>
      <Row>
        <Col sm={6}>
          <Card>
            <CardHeader>
              <Span> Setting Question </Span>
            </CardHeader>
            <CardBody>
              <div className="pb-3">
                <Span>{t('Color')}</Span>
                <CustomInput placeholder="Setting color" />
              </div>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                toolbar={configToolbar}
              />
              <Button color="primary" className="mt-3" onClick={onSave}>
                Save
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Div>
  );
});

const Div = styled.div`
  padding: 1rem;
  background-color: #ecf0f5;
  height: 100%;
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
`;

const CustomInput = styled(Input)`
  border-radius: 0;
  padding: 6px 12px;
  font-size: 15px;

  :focus {
    border-color: #3c8dbc;
    box-shadow: none;
  }
`;

const Span = styled.span`
  display: block;
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 15px;
`;
