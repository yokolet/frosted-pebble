---
layout: post
title: Website Renewal
featured_image: sweets.jpg
excerpt_separator: "<!--more-->"
date: 2025-05-18 15:48 +0900
---
Recently, I re-created this blog site, yokolet's notelets, from scratch.
Still, it is made by [Jekyll](https://jekyllrb.com/) like it was, but now, CSS styles are defined by Tailwind CSS.
This blog post is about what I did to build the website.
<!--more-->

### Motivation

Previously, this blog site used the existing theme called
[bulma clean theme](https://github.com/chrisrhymes/bulma-clean-theme) since 2022.
It was a simple, easy-to-customize, nice theme. I liked that.
However, there were some responsiveness and minor issues.
After the website was created by the bulma clean theme, I studied Tailwind CSS a lot.
I've already built portfolio apps using Tailwind. For now, Tailwind became my best CSS framework.
That's why I decided to re-create my blog site.


### How to Integrate Tailwind CSS

The first challenge I encountered was how to integrate Tailwind CSS to Jekyll.
Since the site will be pushed to GitHub Pages, how to deploy should be considered as well.
For the deployment, I wanted to avoid building a static site locally to push that.
Ideally, pushing to the repository should trigger CI/CD pipeline.
To find a suitable solution, I googled a lot and tested some for a while.
My effort led me to [tailwindcss-ruby](https://github.com/flavorjones/tailwindcss-ruby) and
[jekyll-tailwindcss](https://github.com/vormwald/jekyll-tailwindcss) gems.

The `jekyll-tailwindcss` gem is a Jekyll plugin which uses `tailwnidcss-ruby` gem underneath.
With these two gems, I could build the site completely in Ruby ecosystem -- no `package.json` at all.
That made the CI/CD setting much easier.
Actually, only a couple of clicks on the GitHub repo created an enough GitHub Actions configuration.

Following the explanation of gem site, [https://github.com/vormwald/jekyll-tailwindcss](https://github.com/vormwald/jekyll-tailwindcss),
I installed and set up the gem.
That was just three steps: add the gem to `Gemfile`, create `_tailwind.css` and `assets/css/styles.tailwindcss` files.
That's all. Tailwind CSS started working.
An example Jekyll site by `jekyll-tailwindcss` is out there, which guided me well to develop the site.


### Tailwind CSS Gotcha

The `tailwnidcss-ruby` gem sets Tailwind CSS version to v4. I have used v3, so there were confusions when I started.
For example, I wondered in what directory, `tailwind.config.js` should reside.
After going over the Tailwind CSS [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide),
I figured out that I didn't need the JavaScript config file anymore.
Others were minor confusions, so all were solved by reading the Upgrade guide.

Another topic related to Tailwind CSS is
[Tailwind CSS Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography).
The plugin provides styles to uncontrollable block of source such as Markdown text.
For example, Tailwind CSS doesn't give any style to h1 headings, paragraphs or lists.
The typography plugin covers such area. So, we don't need to write all HTML styles by ourselves.
It is a very handy tool for a blog site where posts are normally written in Markdown.
To use the plugin, just add `prose` to the class list.

The typography plugin's styling is great, but even though, there's an occasion we want to customize the style.
If it is a simple one, such as a link color, we can add `prose-a:text-blue-600` to the class list.
When it grows more styles, those can be added to `_tailwind.css` as in below:

```css
@utility prose {
  & h1 {
    @apply text-xl lg:text-2xl my-[1.5rem] font-semibold
  }
}
```

### GitHub Actions

If it is a simple Jekyll site with vanilla CSS and/or only whitelisted plugins,
just pushing site code to the repository will build and deploy it.
In this Jekyll site, Tailwind CSS is added, which means the site needs GitHub Actions to build/deploy.
As mentioned above, the process was fairly easy since all are in Ruby ecosystem.

Howto is explained at the Jekyll website,
[https://jekyllrb.com/docs/continuous-integration/github-actions/#setting-up-the-action](https://jekyllrb.com/docs/continuous-integration/github-actions/#setting-up-the-action).
Following a few steps there, the config file will be created in `.github/workflows/jekyll.yml`.
What I changed was Ruby version only, nothing else. All done.
When the updates were pushed to the main repository, CI/CD pipeline started running.
Once the build and deploy signals turned green, the website was ready.


### Conclusion

One of the purpose to renew this site was to improve responsiveness.
Tailwind CSS gives us pretty handy ways to achieve that.
With such technology, the renewed site works even in a Mobile size window.
An entire design was created from scratch, so changing styles of specific area became controllable.
In that sense, the renewal was meaningful.
On the other hand, defining styles in every single part was a time-consuming task.
If an existing theme satisfies the requirements, it would be good to use it. 

Lastly, it was an awesome experience to learn more about Tailwind CSS. 
The renewal by Tailwind was relatively easier than I expected.
I enjoyed working on it.
