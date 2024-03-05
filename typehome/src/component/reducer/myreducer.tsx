
//component/reducer/myreducer.tsx
import { MyState, CounterAction } from "../type/commonType";

function myStateReducer(state:MyState, action:CounterAction):MyState
{
    switch(action.type)
    {
        case "increase":
            //새로운 상태 반환 - 디비로 데이터를 읽어 온다 
            //json의 전개 , 앞의 state에 현재 상태 추가하기ㅏ 
            return {...state, count:state.count+1};
        case "decrease":
            return {...state, count:state.count-1};

        case "reset":
            return {...state, count:0};
        
        case "add":
            return {...state, count:state.count + action.count};
                

        default: //예외처리 
            throw new Error("Unknown action"); //throw 가 return을 대신한다 
    }       
    //return {count:0}; //MyState를 반환한다고 했으니까 반드시 반환해야 한다 
}


export {myStateReducer};