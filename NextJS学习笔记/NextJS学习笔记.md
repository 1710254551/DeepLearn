## 入门

### 自动配置

​	[官方文档](https://www.nextjs.cn/)

​	建议使用` create-next-app`创建新的Next.js应用程序,这会自动设置所有内容.

### 手动配置

​	安装next,react,react-dom `yarn add next react react-dom`

​	在package.json文件中添加script配置段

```
"scripts": {
  "dev": "next dev",  //以开发模式启动
  "build": "next build",  //构建用于生产环境的应用程序
  "start": "next start"  //启动生产环境服务器
}
```

### 规定

​	`Next.js`是围绕着页面(pages)的概念构造的.一个页面就是从`pages`目录下的文件导出的React组件

​	`pages`文件夹下根据其文件名与路由关联.如`pages/home.js`会被映射到`/home`.设置可以文件名中添加动态路由参数,如`pages/user/[uid].js`

​	`pages`文件下必须有一个`_app.js`这是入口文件,所有的页面组件将在这被渲染展示,所以全局CSS样式一般都在`_app.js`中导入.

​	`pages`文件夹下的`index.js`会被默认映射`/`

​	tip:	以上提到的文件名,为`Next.js`默认规定的文件名,不得擅自更改



## pages

	### 预渲染

​	默认情况下,`Next.js`将预渲染每个页面.这意味这`Next.js`会预先为每个页面生成`HTML`文件,这带来了更好的性能和`SEO`效果

### 两种形式的预渲染

​	`Next.js`具有两种形式的预渲染: 静态生成(Static Generation) 和 服务器端渲染(Server-side Rendering). 这两种方式的不同之处在于为page(页面)生成HTML页面的时机.

- 静态生成 (推荐) : HTML在**构建时**生成,并在每次页面请求是重用.
- 服务器渲染: 在**每次页面请求时**重新生成HTML.

重要的是，`Next.js` 允许你为每个页面 **选择** 预渲染的方式。你可以创建一个 “混合渲染” 的 `Next.js` 应用程序：对大多数页面使用“静态生成”，同时对其它页面使用“服务器端渲染”。

出于性能考虑，相对服务器端渲染，我们更 **推荐** 使用 **静态生成** 。 `CDN` 可以在没有额外配置的情况下缓存静态生成的页面以提高性能。但是，在某些情况下，服务器端渲染可能是唯一的选择



## 获取数据

### getStaticProps (静态生成)

​	页面需要导出一个名为`getStaticProps`的异步函数,这会在构建的时候使用返回的props预先呈现页面

```
export async function getStaticProps(context){
	return {
		props:{}  //必须返回props:{}的形式
	}
}
```

​	`getStaticProps`应该返回一个对象

 - `props` 一个必需的对象, 将放入页面组件的属性中
 - `revalidate` 重新验证 可选的页面重新生成的时间(s),设置此项,将开启[增量式静态再生](https://www.nextjs.cn/docs/basic-features/data-fetching#incremental-static-regeneration)
 - `notFound` 布尔值, 允许页面返回404状态和页面
 - `redirect` 一个可选的重定向值, 允许重定向到内部和外部资源,它应该匹配`{ destination: string, permanent: boolean }` 的形式

在`getStaticProps`中   [读取文件: 使用`process.cwd()`](https://www.nextjs.cn/docs/basic-features/data-fetching#reading-files-use-processcwd)

### getStaticPaths (静态路径)

​	使用`getStaticPaths`需要在`user/[id].js`文件中使用, 和`getStaticProps`差不多

​		tips: 是在`user`文件夹下名为 `[id].js`

```
export async function getStaticPaths(context){
	return {
		paths:[
			{ params:{ id:'1' } },
			{ params:{ id:'2' } }
		],  //必须返回 paths:[ { params:{} }]  的形式
		fallback: true or false
	}
}
```

​	`paths`为必须属性,`Next.js`将在构建时使用 `[id].js`中的页面组件静态生成 /1 和 /2

​	`params ` 中的参数与页面名称中使用的参数匹配:

​		如果页面是`pages/post/[postId]/[comId]`那`params`应该包含`postId 和 comId`

​	`fallback`也是必须属性.

​		`false`  : `getStaticPaths`会在没有返回任何路径时将生成一个404页面,因为是静态生成,当不经常添加新路径时,也很有用. 当一次性添加过多,则需要再次运行生成

​		`true` : 返回的路径将在构建时通过`getStaticProps`生成静态页面, 当没有路径时不返回404页面,此时可以创建一个[Fallback pages](https://www.nextjs.cn/docs/basic-features/data-fetching#fallback-pages).完成时,浏览器将收到生成路径的`JSON`.这将用于自动渲染页面所需的道具.

### getServerSideProps (服务端生成)

​		用法与`getStaticProps`类似,返回的对象里没有`revalidate` 函数`content`中的参数有所增加

详情见[`getServerSideProps` (Server-side Rendering) (服务器端渲染)](https://www.nextjs.cn/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

​		根本区别在于: 只有在需要预先呈现一个必须在请求时获取数据的页面时使用.比如用户信息页面.

​		首先在速度上比`getStaticProps`慢,因为服务器必须在每个请求上计算结果,而且如果额外的配置,结果不会被`CDN`缓存

​		如果不需要预先呈现数据,可以考虑在客户端获取数据.建议使用 [SWR 太阳辐射](https://www.nextjs.cn/docs/basic-features/data-fetching#swr)  用于获取数据。如果要在客户端获取数据，我们强烈推荐使用这种方法。它处理缓存、重新验证、焦点跟踪、间隔重新抓取等操作。你可以这样使用它:

```jsx
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```



## 内置对CSS的支持

### 添加全局样式

​	要将样式表添加到您的应用程序中，请在 `pages/_app.js` 文件中导入（import）CSS 文件

​	这些样式 (`styles.css`) 将应用于你的应用程序中的所有页面和组件。 由于样式表的全局特性，并且为了避免冲突，你应该 **只在 [`pages/_app.js`](https://www.nextjs.cn/docs/advanced-features/custom-app) 文件中导入（import）样式表**。

​	从`Next.js 9.5.4`开始, 就可以从应用程序的任何位置导入CSS文件(包括`node_modules`)

​	导入第三方组件所需的CSS, 可以在组件中进行

### 组件级CSS

​	`Next.js`通过`[name].module.css`文件命名约定来支持CSS模块

​	CSS 模块通过自动创建唯一的类名从而将 CSS 限定在局部范围内。 这使您可以在不同文件中使用相同的 CSS 类名，而不必担心冲突。

​	此行为使 CSS 模块成为包含组件级 CSS 的理想方法。 CSS 模块文件 **可以导入（import）到应用程序中的任何位置**。

​	CSS 模块是一项 *可选功能*，**仅对带有 `.module.css` 扩展名的文件启用**。 普通的 `<link>` 样式表和全部 CSS 文件仍然是被支持的。

​	在生产环境中，所有 CSS 模块文件将被自动合并为 **多个经过精简和代码分割的** `.css` 文件。 这些 `.css` 文件代表应用程序中的热执行路径（hot execution paths），从而确保为应用程序绘制页面加载所需的最少的 CSS。

### [对 Sass 的支持](https://www.nextjs.cn/docs/basic-features/built-in-css-support#对-sass-的支持)

​	我没怎么用过Sass,官网自己看吧  (#^.^#)

## 图片优化

### 说明

​	Next.js 的 Image 组件（即 [`next/image`](https://www.nextjs.cn/docs/api-reference/next/image)）是对 HTML 的 `<img>` 元素的扩展，跟进了最新的 web 技术。

​	自动图片优化功能（Automatic Image Optimization）能够调整图片尺寸、优化图片并以最新的 [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) 格式传输图片（如果浏览器支持 WebP 格式的话）。这样就可以避免将较大的图片传送到视口（viewport）较小的设备上。此功能还允许 Next.js 自动采用未来的图片格式，并将其传输给支持这些格式的浏览器。

​	自动图片优化功能可以支持任何图片来源。即使是托管在外部数据源上（例如，CMS），仍可对图片进行优化。

​	Next.js 无需在构建时优化图片，而是根据用户的请求按需优化图片。与静态站点生成器和纯静态解决方案不同，无论发布 10 张还是 1000 万张图片，构建时间都不会增加。

​	图片默认是延迟加载的。这意味着你的页面不会因为加载视口（viewport）外的图片而影响页面的加载速度。当图片进入视口（viewport）时才加载。

​	始终以这种方式渲染图片是为了避免 [累计布局偏移（Cumulative Layout Shift）](https://web.dev/cls/)，此 [Core Web Vital](https://web.dev/vitals/) 被 Google 作为参数用于 [搜索排名](https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html)。

### 图片组件

​	`import Image from 'next/image'` 这是Next.js内置的组件

​	具体[配置](https://www.nextjs.cn/docs/basic-features/image-optimization#配置)和[高级设置](https://www.nextjs.cn/docs/basic-features/image-optimization#高级设置)

### next/image

#### 必须属性

 1. src: 一个导入的图片文件或一段字符串路径

    如果使用的是外部 URL，则必须添加到 `next.config.js` 配置文件中的 [domains](https://www.nextjs.cn/docs/basic-features/image-optimization#domains) 配置项中。

2. width: 图片的宽度（以像素为单位）。必须是不带单位的整数。

   除了的静态导入的图片之外,或具有属性`layout="fill"`

3. height: 图片的宽度（以像素为单位）。必须是不带单位的整数。

   除了的静态导入的图片之外,或具有属性`layout="fill"`

#### 可选属性

1. [layout](https://www.nextjs.cn/docs/api-reference/next/image#layout)

2. [loader](https://www.nextjs.cn/docs/api-reference/next/image#loader)

3. [sizes](https://www.nextjs.cn/docs/api-reference/next/image#sizes)

4. [quality](https://www.nextjs.cn/docs/api-reference/next/image#quality)

5. [priority](https://www.nextjs.cn/docs/api-reference/next/image#priority)

6. [placeholder](https://www.nextjs.cn/docs/api-reference/next/image#placeholder)

#### [高级属性](https://www.nextjs.cn/docs/api-reference/next/image#高级属性)

#### [其它属性](https://www.nextjs.cn/docs/api-reference/next/image#其它属性)



## [字体优化](https://www.nextjs.cn/docs/basic-features/font-optimization)

## [静态文件服务](https://www.nextjs.cn/docs/basic-features/static-file-serving)

## [其他特性](https://www.nextjs.cn/docs/basic-features/fast-refresh)

## 路由

### 简介

​	`Next.js`的路由无需额外配置,pages目录本身就是一个路由配置,index文件默认为初始页面.

​	所有页面文件在 `_app.js`文件上加载 ,渲染.文件名即路由路径

​		例: `pages/home.js`  对应 /home 页面

​			 `pages/about/user.js`  对应 /about/user 页面

### 动态路由

​	可结合之前的 `getStaticPaths`一起食用,效果更佳.

​	动态路由分两种: 单参数和多参数.

  - 单参数: 以`pages/user/[id].js`的形式

  - 多参数: 有两种写法 

    - 一, `pages/list/[pid]/[id].js`的形式,`getStaticPaths`中返回的`paths:[ { params:{pid:'1',id:'2'} }]`包含名称对应的`pid和id`字段

    - 二,`pages/list/[...uid].js`的形式,`getStaticPaths`中返回的`paths:[ { params:{uid:[]} }]`其中`uid`对应值为数组,数组中每一个值代表一个路径,**顺序固定从左到右**.   即`uid:['1','2']`对应`/list/1/2`页面

      

### 命令式导航

​	`next/link`应该能够满足你的大部分路由需求，但是你也可以在没有它的情况下进行跳转

​	借助内置的`next/router`依赖进行命令式跳转

```
import { useRouter } from 'next/router'
...
const router = useRouter()

  return (
    <span onClick={() => router.push('/about')}>Click here to read more</span>
  )

...
```

### 浅路由

​	浅路由允许您更改URL，而无需再次运行数据获取方法,您将通过路由器对象(由`useRouter`或`withRouter`添加)接收更新的路径名和查询，而不会丢失状态。若要启用浅路由，请将浅路由选项设置为**true**

```]
router.push('/?counter=10', undefined, { shallow: true })
```

​	浅路由**只适用于**相同页面的URL更改,若要跳转其它页面,即使开启浅路由模式,也将卸载当前页面，加载新页面，并等待数据获取

## API 路由

​	`API`路由规则与`getStaticPaths`一致,但`API`路由需要默认返回一个请求处理器函数,默认接收req,res两个参数

​	具体用法[API 路由](https://www.nextjs.cn/docs/api-routes/introduction)

## 身份验证

确定您需要哪种身份验证模式的第一步是了解您想要的[数据获取策略](https://www.nextjs.cn/docs/basic-features/data-fetching)。然后我们可以确定哪些身份验证提供程序支持此策略。主要有两种模式：

- 使用[静态生成](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended)在服务器端呈现加载状态，然后在客户端获取用户数据。
- 在[服务器端](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering)获取用户数据以消除未经身份验证的内容。

**原理: 在打开页面时 默认进行用户信息请求,或对本地登录过的并有保存信息的用户进行信息提取. 判断登录信息是否有效,则进一步展示内容,否则重定向到`login`**

## [高级特性](https://www.nextjs.cn/docs/advanced-features/preview-mode)

## [API手册](https://www.nextjs.cn/docs/api-reference/cli)

