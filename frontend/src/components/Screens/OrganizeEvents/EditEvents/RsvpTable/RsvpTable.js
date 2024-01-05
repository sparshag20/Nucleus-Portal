import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Button } from 'react-bootstrap';
import { rsvp_remove_name_from_table } from '../../../../Store/Actions/eventActions';
import { useDispatch } from 'react-redux';
const RsvpTable = (props) => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [eventId,setEventId]=useState();
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 500px)").matches
  )
  
  useEffect(() => {
    window
      .matchMedia("(max-width: 500px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);
  useEffect(() => {
   
  }, [selectedRowKeys,props.list]);
  const mobile=[
    
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Contact',
      dataIndex: 'contact',

    },
  ]
  const columns = [
    
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Contact',
      dataIndex: 'contact',

    },
    {
      title: 'Date and Time of RSVP',
      dataIndex: 'date_time_of_rsvp',
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    setEventId(props.id_of_event);
  };
  const removersvp=()=>{
    if (window.confirm("Are you sure?")) {
      dispatch(rsvp_remove_name_from_table(eventId,selectedRowKeys));
    }
  }
  return (
    <>
    {matches && <Table 
     
    columns={mobile} dataSource={props.list} size='small'
       rowSelection={{
        type: 'checkbox',
        // onSelect: (record) => {
        //   console.log({ record })
        // }
        selectedRowKeys,
        onChange: onSelectChange,
      }}
     style={{fontSize: "3vh",fontFamily:"monospace"}}
      ></Table>
    }
     {!matches &&  <Table 
    
     columns={columns} dataSource={props.list} size='small'
       rowSelection={{
        type: 'checkbox',
        // onSelect: (record) => {
        //   console.log({ record })
        // }
        selectedRowKeys,
        onChange: onSelectChange,
      }}
     
      ></Table>
      }
    
      { selectedRowKeys.length!==0 && <Button variant="primary" size="sm" onClick={()=>removersvp()} >
      Remove Selected Participants
    </Button>}
    { selectedRowKeys.length===0 && <Button variant="primary" size="sm" disabled>
      Remove Selected Participants
    </Button>}
    </>
  )
}

export default RsvpTable
