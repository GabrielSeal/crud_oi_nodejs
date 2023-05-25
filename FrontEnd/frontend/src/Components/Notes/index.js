import React from "react";
import {AiTwotoneDelete, AiOutlineExclamationCircle} from "react-icons/ai"


function Notes({data})
{
    return(
        <>
          <li className='notepad-infos'>
            <div>
              <strong>{data.title}</strong>
              <div>
                <AiTwotoneDelete size="20"/>
              </div>
            </div>
            <textarea defaultValue={data.notes}></textarea>
            <span><AiOutlineExclamationCircle size="20"/></span>
          </li>
        </>
    )
}

export default Notes;