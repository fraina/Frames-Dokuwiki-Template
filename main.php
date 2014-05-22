<?php
/**
 * DokuWiki Starter Template
 *
 * @link     http://dokuwiki.org/template:starter
 * @author   Anika Henke <anika@selfthinker.org>
 * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
 */

if (!defined('DOKU_INC')) die(); /* must be run from within DokuWiki */
@require_once(dirname(__FILE__).'/tpl_functions.php'); /* include hook for template functions */
header('X-UA-Compatible: IE=edge,chrome=1');

$showTools = !tpl_getConf('hideTools') || ( tpl_getConf('hideTools') && $_SERVER['REMOTE_USER'] );
$showTOC = ($ACT == "show");
?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $conf['lang'] ?>"
  lang="<?php echo $conf['lang'] ?>" dir="<?php echo $lang['direction'] ?>" class="no-js">
	<head>
	    <meta charset="UTF-8" />
	    <title><?php tpl_pagetitle() ?> [<?php echo strip_tags($conf['title']) ?>]</title>
	    <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>
    	<?php tpl_metaheaders() ?>
	    
    	<link rel="stylesheet" media="screen" href="<?php echo DOKU_TPL.'css/screen.css'?>">
    	<link rel="stylesheet" media="screen" href="<?php echo DOKU_TPL.'css/jquery.mCustomScrollbar.css'?>">
    	
    	<script src="<?php echo DOKU_TPL.'js/jquery.mobile.custom.js'?>"></script>
    	<script src="<?php echo DOKU_TPL.'js/jquery.nicescroll.min.js'?>"></script>
    	<script src="<?php echo DOKU_TPL.'js/jquery.mCustomScrollbar.concat.min.js'?>"></script>
		<script src="<?php echo DOKU_TPL.'js/js.js'?>"></script>
		
	    <meta name="viewport" content="width=device-width,initial-scale=1" />
	    <?php echo tpl_favicon(array('favicon', 'mobile')) ?>
	    <?php tpl_includeFile('meta.html') ?>
	    
	</head>

	<body>
		<?php
		    // render the content into buffer for later use
		    ob_start();
		    tpl_content(false);
		    $buffer = ob_get_clean();
		?>
		
	    <?php /* with these Conditional Comments you can better address IE issues in CSS files,
         precede CSS rules by #IE7 for IE7 and #IE8 for IE8 (div closes at the bottom) */ ?>
		<!--[if lte IE 7 ]><div id="IE7"><![endif]--><!--[if IE 8 ]><div id="IE8"><![endif]-->

	    <?php /* the "dokuwiki__top" id is needed somewhere at the top, because that's where the "back to top" button/link links to */ ?>
	    <?php /* tpl_classes() provides useful CSS classes; if you choose not to use it, the 'dokuwiki' class at least
         should always be in one of the surrounding elements (e.g. plugins and templates depend on it) */ ?>
		<div class="page">
			
			<div class="Mlist">
				<?php tpl_toc()?>
				<a href="#" title="回到頂端" class="top">回到頂端</a>
			</div>
			
			<header>
				<div class="main">
					<div class="logo">
						<span class="title"><?php tpl_link(wl(),$conf['title'],'accesskey="h" title="[H]"') ?></span>
						<span class="slogan">
							<?php /* how to insert logo instead (if no CSS image replacement technique is used):
	                        upload your logo into the data/media folder (root of the media manager) and replace 'logo.png' accordingly:
	                        tpl_link(wl(),'<img src="'.ml('logo.png').'" alt="'.$conf['title'].'" />','id="dokuwiki__top" accesskey="h" title="[H]"') */ ?>
			                <?php if ($conf['tagline']): ?>
			                    <p class="claim"><?php echo $conf['tagline'] ?></p>
			                <?php endif ?>
						</span>
					</div>
					<div class="options">
						<div class="forMobile">
							<a href="#"><img src="<?php echo DOKU_TPL.'images/mobile_menu.png'?>" alt="Menu" /></a>
						</div>
						
						<div class="searchbox mobileElse">
							<div class="click_area">Open Searchbar</div>
							<?php tpl_searchform() ?>
						</div>
						
						<ul class="menu">
							<li>
								<a href="#" id="Options_PC" title="<?php echo $lang['site_tools'] ?>"><?php echo $lang['site_tools'] ?></a>
								<div class="optionsMenu">
									<ul>
				                        <?php
				                        	tpl_action('edit', 1, 'li');
											tpl_action('revisions', 1, 'li');
				                            tpl_action('backlink', 1, 'li');
				                        ?>
				                    </ul>
									<ul>
				                        <?php
				                            tpl_action('recent', 1, 'li');
				                        	tpl_action('media', 1, 'li');
				                            tpl_action('index', 1, 'li');
				                        ?>
				                    </ul>
								</div>
							</li>
							<li>
								<a href="#" title="<?php echo $lang['user_tools']; ?>"><?php echo $lang['user_tools']; ?></a>
								<div class="loginMenu">
									<ul>
			                            <?php /* the optional second parameter of tpl_action() switches between a link and a button,
			                                     e.g. a button inside a <li> would be: tpl_action('edit',0,'li') */
			                                if ($_SERVER['REMOTE_USER']) {
			                                    echo '<li>';
			                                    tpl_userinfo(); /* 'Logged in as ...' */
			                                    echo '</li>';
			                                }
			                                tpl_action('admin', 1, 'li');
			                                if (tpl_getConf('userNS')) {
			                                    _tpl_userpage(tpl_getConf('userNS'),1,'li');
			                                }
			                                tpl_action('profile', 1, 'li');
			                                tpl_action('login', 1, 'li');
			                            ?>
			                        </ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<ul class="forMobile Mmenu">
					<li class="searchbar">
						<div class="searchbox">
							<?php tpl_searchform() ?>
						</div>
					</li>
					<li>
						<a href="#" title="編輯本頁" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_edit.png'?>" alt="編輯本頁" />
							<span>編輯本頁</span>
							<?php
				                tpl_action('edit',  1, 'span');
							?>
						</a>
					</li>
					<li>
						<a href="#" title="最近更新" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_update.png'?>" alt="最近更新" />
							<span>最近更新</span>
							<?php
				                tpl_action('recent',  1, 'span');
							?>
						</a>
					</li>
					<li>
						<a href="#" title="網站地圖" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_sitemap.png'?>" alt="網站地圖" />
							<span>網站地圖</span>
							<?php
				                tpl_action('index',  1, 'span');
							?>
						</a>
					</li>
					<li>
						<a href="#" title="登入 / 登出" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_logout.png'?>" alt=""登入 / 登出" />
							<span>登入 / 登出</span>
							<?php
								tpl_action('login', 1, 'span');
							?>
						</a>
					</li>	
					<li>
						<a href="#" title="多媒體管理器" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_media.png'?>" alt="多媒體管理器" />
							<span>多媒體管理器</span>
							<?php
								tpl_action('media', 1, 'span');
							?>
						</a>
					</li>
					<li>
						<a href="#" title="系統設定" class="opt">
							<img src="<?php echo DOKU_TPL.'images/icon_setting.png'?>" alt="系統設定" />
							<span>系統設定</span>
							<?php
								tpl_action('admin', 1, 'span');
							?>
						</a>
					</li>
				</ul>
			</header>
			
			<nav style="position: relative;">
				<div class="main">
					<?php if($conf['breadcrumbs']){ ?>
		                <div class="breadcrumb"><?php tpl_breadcrumbs() ?></div>
		            <?php } ?>
		            <?php if($conf['youarehere']){ ?>
		                <div class="breadcrumb">
		                	<?php tpl_youarehere() ?>
		                </div>
		            <?php } ?>
					
					<aside class="mobileElse">
						<ul>
							<li><a href="#" title="回到頁面頂端">回到頁面頂端</a></li>
							<?php
				                tpl_action('edit', 1, 'li');
				            ?>
							<li id="show_list">
								<a title="目錄">目錄</a>
								<div class="list">
									<?php tpl_toc()?>
								</div>
							</li>
						</ul>
					</aside>
				</div>
			</nav>

			<div class="container">
				<div class="content">
					<?php tpl_flush() /* flush the output buffer */ ?>
                	<?php tpl_includeFile('pageheader.html') ?>
                    <!-- wikipage start -->
					<?php tpl_content(false); ?>
                    <!-- wikipage stop -->
                    <?php tpl_flush() ?>
                	<?php tpl_includeFile('pagefooter.html') ?>
                    <?php tpl_flush() ?>
				</div>
			</div>
			
			<?php tpl_flush() ?>

			<footer>
				<div class="main">
					<p><?php tpl_pageinfo() ?></p>
					<?php tpl_license(''); // license text ?>
 
				    <div class="buttons">
				        <?php
				            tpl_license('button', true, false, false); // license button, no wrapper
				            $target = ($conf['target']['extern']) ? 'target="'.$conf['target']['extern'].'"' : '';
				        ?>
				        <a href="http://www.dokuwiki.org/donate" title="Donate" <?php echo $target?>><img
				            src="<?php echo tpl_basedir(); ?>images/button-donate.gif" width="80" height="15" alt="Donate" /></a>
				        <a href="http://www.php.net" title="Powered by PHP" <?php echo $target?>><img
				            src="<?php echo tpl_basedir(); ?>images/button-php.gif" width="80" height="15" alt="Powered by PHP" /></a>
				        <a href="http://validator.w3.org/check/referer" title="Valid HTML5" <?php echo $target?>><img
				            src="<?php echo tpl_basedir(); ?>images/button-html5.png" width="80" height="15" alt="Valid HTML5" /></a>
				        <a href="http://jigsaw.w3.org/css-validator/check/referer?profile=css3" title="Valid CSS" <?php echo $target?>><img
				            src="<?php echo tpl_basedir(); ?>images/button-css.png" width="80" height="15" alt="Valid CSS" /></a>
				        <a href="http://dokuwiki.org/" title="Driven by DokuWiki" <?php echo $target?>><img
				            src="<?php echo tpl_basedir(); ?>images/button-dw.png" width="80" height="15" alt="Driven by DokuWiki" /></a>
				    </div>
				</div>
			</footer>
			
		</div>
		<div class="no"><?php tpl_indexerWebBug() /* provide DokuWiki housekeeping, required in all templates */ ?></div>
		<div id="screen__mode" class="no"></div><?php /* helper to detect CSS media query in script.js */ ?>
    	<!--[if ( lte IE 7 | IE 8 ) ]></div><![endif]-->
    	
	</body>
</html>
