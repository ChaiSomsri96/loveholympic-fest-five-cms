/**
 *
 * CoderUserManagement
 *
 */
import { FesButton } from 'app/components/FesButton/Loadable';
import { FesFileUpload } from 'app/components/FesFileUpload/Loadable';
import { FesInput } from 'app/components/FesInput/Loadable';
import { FesTable } from 'app/components/FesTable/Loadable';
import { FesLoading } from 'app/components/FesLoading/Loadable';
import { PenToolIcon, SearchIcon, UploadExcelIcon } from 'app/components/Icons';
import { No as NumberColumn } from 'app/components/RenderColumns';
import { defaultPaginate } from 'app/config/filter';
import { fileTypeExcel, getFileType } from 'app/constants';
import { useModalSlice } from 'app/pages/Modal/slice';
import { useUsercodeSlice } from 'app/pages/UserCodeManage/slice';
import {
  selectUserPaginate,
  selectLoading,
} from 'app/pages/UserCodeManage/slice/selectors';
import { debounce } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {}

export const UserCodeManage = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useUsercodeSlice();
  const { actions: modalActions } = useModalSlice();

  const [filter, setFilter] = useState({
    ...defaultPaginate,
    search: '',
    statusSms: '',
  });
  const userCodePaginate = useSelector(selectUserPaginate);
  const loading = useSelector(selectLoading);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [selectAll, setSelectAll] = useState([
    {
      isCheck: false,
      page: 0,
    },
  ]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(actions.getUserPaginate(filter));
  }, [actions, dispatch, filter]);

  const handleCheckAll = useCallback(() => {
    const arrayIds = userCodePaginate.results.map(item => item._id);
    const { page, limit } = filter;

    const tmpCl = [...selectAll].map(item => {
      if (item.page !== page) {
        item.isCheck = false;
      } else {
        item.isCheck = !item.isCheck;
      }
      return item;
    });

    let checkedCopy: boolean[] = [];
    for (let index = page * limit; index < (page + 1) * limit; index++) {
      checkedCopy[index] = tmpCl[page].isCheck;
    }

    setIds(tmpCl[page].isCheck ? arrayIds : []);
    setChecked(checkedCopy);
    setSelectAll(tmpCl);
  }, [filter, selectAll, userCodePaginate]);

  const handleSingleCheckbox = useCallback(
    row => {
      const arrayIds = [...ids];
      let checkedCopy = [...checked];
      const { limit, page } = filter;
      checkedCopy[limit * page + row.index] = !checked[
        limit * page + row.index
      ];

      if (checkedCopy[limit * page + row.index] === false) {
        const tmpCl = [...selectAll];
        tmpCl[page].isCheck = false;

        const position = arrayIds.indexOf(row.original._id);
        arrayIds.splice(position, 1);

        setSelectAll(tmpCl);
      } else {
        arrayIds.push(row.original._id);
      }
      setChecked(checkedCopy);
      setIds(arrayIds);
    },
    [checked, filter, ids, selectAll],
  );

  const columns = useMemo(() => {
    const { page, limit } = filter;
    return [
      {
        Header: (
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={selectAll[page].isCheck}
          />
        ),
        accessor: 'selection',
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={checked[limit * page + row.index]}
            onChange={() => handleSingleCheckbox(row)}
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        Header: '순번',
        accessor: 'no',
        Cell: cell => (
          <NumberColumn cell={cell} pageNumber={userCodePaginate} />
        ),
      },
      {
        Header: '사용자 번호',
        accessor: 'userID',
        Cell: ({ cell }) => {
          return cell.value
            ? `USER${cell.value.substr(cell.value.length - 5).toUpperCase()}`
            : '-';
        },
      },
      {
        Header: '사용자명',
        accessor: 'nickname',
      },
      {
        Header: '코드번호',
        accessor: 'code',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        Cell: ({ cell }) => {
          return cell.value;
        },
      },
      {
        Header: 'SMS 전송 상태',
        accessor: '-',
        Cell: ({ cell }) => {
          const { isSendSMS, isSendSmsSuccess } = cell.row.original;

          if (isSendSMS && isSendSmsSuccess) {
            return '전송 완료';
          } else if (isSendSMS && !isSendSmsSuccess) {
            return 'Send Failed';
          } else {
            return '미전송';
          }
        },
      },
    ];
  }, [
    checked,
    filter,
    handleCheckAll,
    handleSingleCheckbox,
    selectAll,
    userCodePaginate,
  ]);

  const onChangeFile = useCallback(
    e => {
      e.preventDefault();
      const file = e.target.files[0];
      e.target.value = null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        if (!fileTypeExcel.includes(getFileType(file.name))) {
          return toast.error('파일이 유효하지 않습니다');
        }
        dispatch(actions.importCode(formData));
      }
    },
    [actions, dispatch],
  );

  const handleDeleteCode = useCallback(() => {
    const data = {
      deleteFlag: false,
      ids: ids,
    };
    dispatch(
      modalActions.showConfirmModal({
        title: '확인',
        description: '삭제 하시겠습니까?',
        onYes: () => {
          dispatch(actions.deleteCodeUser({ data, filter }));
          setChecked([]);
          setIds([]);
        },
        onNo: () => {
          dispatch(modalActions.showConfirmModal(false));
        },
      }),
    );
  }, [actions, dispatch, filter, ids, modalActions]);

  const handlePageChange = useCallback(
    page => {
      let tmpCl = [...selectAll];
      tmpCl[page] = {
        isCheck: tmpCl[page] ? tmpCl[page].isCheck : false,
        page: page,
      };
      setSelectAll(tmpCl);
      setFilter({
        ...filter,
        page,
      });
    },
    [filter, selectAll],
  );

  const debounceHandle = debounce(
    nextValue =>
      setFilter({
        ...filter,
        search: nextValue,
      }),
    1000,
  );

  const onSearch = useCallback(
    e => {
      const { value } = e.target;
      debounceHandle(value.trim());
    },
    [debounceHandle],
  );

  const onTriggerFile = useCallback(() => {
    fileRef.current?.click();
  }, []);

  const clickSettingSMS = useCallback(() => {
    dispatch(modalActions.showSettingSendSMSModal(true));
  }, [dispatch, modalActions]);

  const onSendSmsManual = useCallback(() => {
    dispatch(modalActions.showSettingSmsUserModal(ids));
  }, [dispatch, ids, modalActions]);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;
      setFilter({
        ...filter,
        statusSms: value,
      });
    },
    [filter],
  );

  return (
    <>
      {loading && <FesLoading />}
      <Div>
        <Title>{t('사용자 코드 관리')}</Title>
        <Div className="wrap-button">
          <>
            <FesFileUpload
              fileRef={fileRef}
              onChangeFile={onChangeFile}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            >
              <Button color="success" onClick={onTriggerFile}>
                <UploadExcelIcon />
                <span className="ml-2">{t('엑셀 업로드')}</span>
              </Button>
            </FesFileUpload>
          </>

          <FesButton
            title={'SMS내용설정'}
            style={styleSMS}
            icon={<PenToolIcon />}
            onClick={clickSettingSMS}
          />

          <FesButton
            title={'SMS내용설정(선택)'}
            style={{
              background: '#2D9CDB',
            }}
            icon={<PenToolIcon />}
            onClick={onSendSmsManual}
          />
        </Div>

        <FilterWrapper>
          <WrapSearch>
            <FesInput
              placeholder="사용자 번호, 사용자명, 코드 번호, 전화번호 등으로 검색 "
              onChange={onSearch}
            />
            <span className="display-icon">
              <SearchIcon />
            </span>
          </WrapSearch>

          <CustomInput type="select" name="statusSms" onChange={handleChange}>
            <option value={''}>{t('모두')}</option>
            <option value={'success'}>{t('전송 완료')}</option>
            <option value={'error'}>{t('미전송')}</option>
          </CustomInput>
        </FilterWrapper>

        {ids.length > 0 && (
          <div className="text-right">
            <Button color="danger" onClick={handleDeleteCode}>
              {t('삭제')}
            </Button>
          </div>
        )}

        <FesTable
          columns={columns}
          data={userCodePaginate.results}
          handlePageChange={currentPage => handlePageChange(currentPage - 1)}
          paginateData={userCodePaginate}
        />
      </Div>
    </>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  height: 100%;
  padding: 10px 40px 10px 15px;
  &.wrap-button {
    display: flex;
    justify-content: flex-end;
    height: auto;
  }
`;

const WrapSearch = styled.div`
  width: 32%;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .display-icon {
    position: relative;
    right: 30px;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
`;

const styleSMS = {
  background: '#2A4365',
  marginLeft: '30px',
};

const CustomInput = styled(Input)`
  border-radius: 0;
  padding: 6px 12px;
  font-size: 15px;
  width: 7%;

  :focus {
    border-color: #3c8dbc;
    box-shadow: none;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
