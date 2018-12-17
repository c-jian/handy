<?php
namespace app\login\controller;
use think\Db;
use think\Controller;
class Index extends Controller
{
	/*登录页面*/
	public function index(){
		// return view();
	}
	/*注册页面*/
	public function register(){
		// return view();
	}
	
	/**
	*用户注册
	*/
    public function reg(){

		$uname=input('uname');
		$password=input('pwd');

		if(!isset($uname) || empty($uname)){
			$this->respond(['msg'=>'用户名为空','code'=>1]);
		}
		if(!isset($password) || empty($password)){
			$this->respond(['msg'=>'密码为空','code'=>1]);
		}
		if(Db::table('user')->where(array('uname'=>$uname))->find()){
			$this->respond(['msg'=>'用户已存在','code'=>1]);
		}
		
		$res=Db::table('user')->insertGetId(array('uname'=>$uname,'password'=>md5($password),'regtime'=>date('Y-m-d H:i:s',time())));

	
		if($res){
			$this->respond(['msg'=>'用户已存在','data'=>$res]);
		}else{
			$this->respond(['msg'=>'用户已存在','code'=>4,'error'=>$res]);
		}
	}
	/*登录*/
	public function login(){
		
		$uname=input('uname');
		$password=input('pwd');
		
		if(!isset($uname) || empty($uname)){
			$this->respond(['msg'=>'用户名为空','code'=>1]);
		}
		if(!isset($password) || empty($password)){
			$this->respond(['msg'=>'密码为空','code'=>1]);
		}
		
		$res=Db::table('user')->where(array('uname'=>$uname))->find();
		
		if(empty($res)){
			$this->respond(['msg'=>'账号错误','code'=>2]);
		}
		
		if($res['password']!=md5($password)){
			$this->respond(['msg'=>'密码错误','code'=>2]);
		}
		
		$token=$this->getToken();
		
		$data=array(
			'uname'=>$res['uname'],
			'token'=>$token,
			'id'=>$res['id']
		);
		
		Db::table('user')->where(array('id'=>$res['id']))->update(array('token'=>$token));//保存token并设置过期时间
		
		$this->respond(['msg'=>'登录成功','data'=>$data,'code'=>0]);
		
	}
	/**
	*生成token/id
	*/
	private function getToken(){
		$str = md5(uniqid(md5(microtime(true)),true));  //生成一个不会重复的字符串
        $str = sha1($str);  //加密
        return $str;
	}
	/**
     * 返回数据
     */
    private function respond($data){
    	header('Content-Type:application/json; charset=utf-8');
    	echo json_encode($data,JSON_UNESCAPED_UNICODE);
    	exit();
    }
}











?>