from dotenv import load_dotenv
import requests
import json
import os

load_dotenv()
rest_api_key=os.getenv("REST_API_KEY")
with open("kakao_token.json", "r") as json_file:
    tokens=json.load(json_file)

url="https://kapi.kakao.com/v2/api/talk/memo/default/send"

headers={
    "Authorization" : "Bearer " + tokens["access_token"]
}

data={
    "template_object" : json.dumps({
        "object_type":"text",
        "text" : "안녕~",
        "link" : {
            "web_url":"0.0.0.0"
        }
    })
}

response=requests.post(url, headers=headers, data=data)
print(response.status_code)

if response.json().get('result_code')==0:
    print('메시지를 성공적으로 보냈습니다!')
else:
    print('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : '+str(response.json()))
    info_url="https://kapi.kakao.com/v2/user/scopes"
    params={"secure_resource":True}
    info_res=requests.get(info_url, headers=headers, params=params)
    print(info_res.json())
