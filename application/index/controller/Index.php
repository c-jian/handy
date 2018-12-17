<?php
namespace app\index\controller;
use think\Db;
use think\Cookie;
class Index
{
    /**
    *构造函数
    */
    public function __construct(){
         
        $uname=Cookie::get('handyuname');
        $token=Cookie::get('handytoken');
        
        if(empty($uname)){
            $this->respond(['msg'=>'请登录','code'=>401]); //未登录
        }
        
        $res=Db::table('user')->where(array('uname'=>$uname))->find();

        if(!$res){
            $this->respond(['msg'=>'您无权操作','code'=>403]); //无权操作
        }
        
        if(empty($token)){
            $this->respond(['msg'=>'验证信息不存在','code'=>404]); //无权操作
        }

        if($res['token']!=$token){
            $this->respond(['msg'=>'非法验证信息','code'=>401]); //无权操作
        }
        
        // if(time()>$res['maxtime'] && $res['maxtime']!=0){
        //     $this->respond('验证信息已过期，请重新登录',null,401); //未登录
        // }
    }

    public function index()
    {
        echo phpinfo();   
    }

    /**
     * 添加账号信息
     */
    public function addAccount(){
    	$title=input('title');
    	$uname=input('username');
    	$pwd=input('password');
    	$url=input('url');
    	$email=input('email');
        $other=input('other');

    	$data=array(
    		'title'=>$title,
    		'username'=>$uname,
    		'password'=>$pwd,
    		'url'=>$url,
    		'email'=>$email,
            'other'=>$other,
            'addtime'=>date('Y-m-d H:i:s',time())
    	);

    	$result=Db::table('account-info')->insert($data);
    	//$aid = Db::name('account-info')->getLastInsID();
    	$this->respond(['msg'=>'添加账号信息成功','code'=>0]);
    }

    /**
     * 分页数据
     */
    public function getData(){
    	$page=empty(input('page'))?1:input('page');
    	$size=empty(input('size'))?11:input('size');

    	$total=ceil(Db::table('account-info')->count()/$size);

    	$result=Db::table('account-info')->limit(($page-1)*$size.',11')->order('id desc')->select();
 
    	$this->respond(['msg'=>'获取数据成功','code'=>0,'data'=>$result,'total'=>$total]);

    }

    /**
     * 获取数据
     */
    public function getDataById(){
        $id=input('id');
        $res=Db::table('account-info')->where(array('id'=>$id))->find();
        if($res){
            $this->respond(['msg'=>'获取数据成功','code'=>0,'data'=>$res]);
        }
    }

    /**
     * 删除数据
     */
    public function del(){
        $id=input('id');
        $res=Db::table('account-info')->where(array('id'=>$id))->delete();
        if($res){
            $this->respond(['msg'=>'删除一条记录成功','code'=>0]);
        }
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
