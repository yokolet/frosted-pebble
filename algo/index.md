---
layout: algo_page
group: Algorithm
title: Index
---

{% assign menus = site.data.algo_menu %}
{% assign everything = [] %}
{% for menu in menus %}
  {% assign list = menu.list %}
  {% assign submenus = site.data.[list] %}
  {% for submenu in submenus %}
    {% assign everything = everything | concat: submenu.items %}
  {% endfor %}
{% endfor %}

{% assign everything = everything | sort: 'name' %}
<div id="algo-index" class="ml-4 lg:ml-10">
  <div class="flex flex-col space-y-4 items-start justify-start">
  {% for item in everything %}
    <div class="w-full leading-none">
      <a
        class="no-underline text-pretty text-sm lg:text-base hover:text-rose-800 font-light tracking-tight"
        href="{{ item.link | relative_url }}"
      >
        {{ item.name }}
      </a>
    </div>
    {% endfor %}
  </div>
</div>
