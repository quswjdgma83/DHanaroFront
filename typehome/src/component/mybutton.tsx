// function MyButton({title, name}:{title:string, name:string}) {
//     return ( <button>
//         {title} {name}
//     </button> );
// }

//인터페이스 : 실체가 존재안함 , 클래스를 만들지 않고 주로 인터페이스나 타입
interface MyButtonProps{
    title:string; 
    disabled:boolean; 
    name:string;
}

function MyButton(props:MyButtonProps){
    return <button disabled={props.disabled}>
        {props.title}
    </button>
}

export default MyButton;

