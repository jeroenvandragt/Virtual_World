Shader "Custom/Custom VW Shader" 
{
	Properties
	{
		//varName(Display Name, Type) = StartingValue{}
		_ColorTint("Color Tint" , Color) = (1,1,1,1) //Change the Color Tint overlay of an object
		//_TintValue("Tint Intensity" ,Range(0.0,1.0)) = 0.4 //Change a tint intensity of the Color Tint
		_Darkness("Darkness Value" , Range(-1,1)) = 0 //Change the darkness value of an object
		_MainTex("Diffuse Texture",2D) = "white"{} //Add a Texture to an object
		_Detail ("Detail", 2D) = "gray" {} //Add a layer of detail to the object
		_BumpTex("Normal Map" , 2D) = "bump"{} //Add a normal map to the object
		//_Cube("Cube Map",CUBE) = ""{}
		
	}
	SubShader
	{
		Tags{ "Rendertype" = "Opaque" }
		CGPROGRAM
		#pragma surface surf BlinnPhong finalcolor:mycolor
		struct Input
		{
			//float4 color : COLOR;
			float2 uv_MainTex;
			float2 uv_BumpTex;
			float2 uv_Detail;
			//float3 worldRefl;
		};

		float _Darkness;
		sampler2D _MainTex;
		sampler2D _BumpTex;
		sampler2D _Detail;
	//	samplerCUBE _Cube;
		
		fixed4 _ColorTint;
      	void mycolor (Input IN, SurfaceOutput o, inout fixed4 color)
     	{
			color *= _ColorTint;
		}
		
		void surf (Input IN, inout SurfaceOutput o)
		{
			o.Albedo = tex2D(_MainTex, IN.uv_MainTex).rgb * (1-_Darkness);//Add the actual texture to the object with the darkness value
			o.Albedo *= tex2D (_Detail, IN.uv_Detail).rgb * 2;
			o.Normal = UnpackNormal (tex2D (_BumpTex, IN.uv_BumpTex));
			//o.Emission = texCUBE (_Cube, IN.worldRefl).rgb;
		}
		ENDCG
	}
	FallBack "Diffuse"
}