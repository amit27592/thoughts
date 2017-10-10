/*
* Copyright (c) 2010 Apple Inc. All rights reserved.
*/
function characterNeedsScoreMultiplier(e) {
    if (!e || e.length === 0)
            return !1;
    var t = e.charCodeAt(0);
    return t > 11904 && t < 12031 ? !0 : t > 12352 && t < 12543 ? !0 : t > 12736 && t < 19903 ? !0 : t > 19968 && t < 40959 ? !0 : t > 44032 && t < 55215 ? !0 : t > 63744 && t < 64255 ? !0 : t > 65072 && t < 65103 ? !0 : t > 131072 && t < 173791 ? !0 : t > 194560 && t < 195103 ? !0 : !1
}

function domDistance(e, t, n) {
    var r = [],
            i = e;
    while (i)
            r.unshift(i), i = i.parentNode;
    var s = [];
    i = t;
    while (i)
            s.unshift(i), i = i.parentNode;
    var o = Math.min(r.length, s.length),
            u = Math.abs(r.length - s.length);
    for (var a = o; a >= 0; --a) {
            if (r[a] === s[a])
                    break;
            u += 2;
            if (n && u >= n)
                    return n
    }
    return u
}

function fontSizeFromComputedStyle(e, t) {
    var n = parseInt(e.fontSize);
    return isNaN(n) && (n = t ? t : BaseFontSize), n
}

function contentTextStyleForNode(e, t) {
    function n(e) {
            if (isNodeWhitespace(e))
                    return null;
            var t = getComputedStyle(e.parentNode);
            return t.float !== "none" ? null : t
    }
    var r = "descendant::text()[not(parent::h1) and not(parent::h2) and not(parent::h3) and not(parent::h4) and not(parent::h5) and not(parent::h6)]",
            i = e.evaluate(r, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
            s = i.snapshotLength;
    for (var o = 0; o < s; ++o) {
            var u = i.snapshotItem(o),
                    a = !1;
            for (var f = u.parentElement; f !== t; f = f.parentElement)
                    if (NegativeRegEx.test(f.className)) {
                            a = !0;
                            break
                    }
            if (a)
                    continue;
            var l = n(u);
            if (l)
                    return l
    }
    return null
}

function isNodeWhitespace(e) {
    return !e || e.nodeType !== Node.TEXT_NODE ? !1 : !/\S/.test(e.data)
}

function removeWhitespace(e) {
    return e.replace(/\s+/g, "")
}

function isElementNode(e) {
    return e && e.nodeType === Node.ELEMENT_NODE ? !0 : !1
}

function computedStyleIndicatesElementIsInvisibleDueToClipping(e) {
    if (e.position !== "absolute")
            return !1;
    var t = e.clip.match(/^rect\((\d+px|auto), (\d+px|auto), (\d+px|auto), (\d+px|auto)\)$/);
    if (!t || t.length !== 5)
            return !1;
    var n = t.map(function (e) {
                    return parseInt(e)
            }),
            r = n[1];
    isNaN(r) && (r = 0);
    var i = n[2],
            s = n[3],
            o = n[4];
    return isNaN(o) && (o = 0), r >= s || i >= o
}

function isElementVisible(e) {
    var t = getComputedStyle(e);
    if (t.visibility !== "visible" || t.display === "none")
            return !1;
    if (cachedElementBoundingRect(e).height)
            return !0;
    var n = document.createRange();
    return n.selectNode(e), !!n.getBoundingClientRect().height
}

function isElementPositionedOffScreen(e) {
    var t = cachedElementBoundingRect(e);
    return !t.height || !t.width ? !1 : t.bottom <= 0 || t.right <= 0 ? !0 : !1
}

function elementDepth(e) {
    var t = 0;
    for (; e; e = e.parentElement)
            t++;
    return t
}

function depthOfElementWithinElement(e, t) {
    var n = 0;
    for (; e !== t; e = e.parentElement)
            n++;
    return n
}

function nearestAncestorElementWithTagName(e, t) {
    while (e = e.parentElement)
            if (e.tagName === t)
                    return e;
    return null
}

function cachedElementBoundingRect(e) {
    if (e._cachedElementBoundingRect)
            return e._cachedElementBoundingRect;
    var t = e.getBoundingClientRect();
    return ReaderArticleFinderJS._elementsWithCachedBoundingRects.push(e), !ReaderArticleFinderJS._cachedScrollX && !ReaderArticleFinderJS._cachedScrollY ? (e._cachedElementBoundingRect = t, e._cachedElementBoundingRect) : (e._cachedElementBoundingRect = {
            top: t.top + ReaderArticleFinderJS._cachedScrollY,
            right: t.right + ReaderArticleFinderJS._cachedScrollX,
            bottom: t.bottom + ReaderArticleFinderJS._cachedScrollY,
            left: t.left + ReaderArticleFinderJS._cachedScrollX,
            width: t.width,
            height: t.height
    }, e._cachedElementBoundingRect)
}

function clearCachedElementBoundingRects() {
    var e = ReaderArticleFinderJS._elementsWithCachedBoundingRects,
            t = e.length;
    for (var n = 0; n < t; ++n)
            e[n]._cachedElementBoundingRect = null;
    ReaderArticleFinderJS._elementsWithCachedBoundingRects = []
}

function innerTextOrTextContent(e) {
    var t = e.innerText;
    return /\S/.test(t) || (t = e.textContent), t
}

function levenshteinDistance(e, t) {
    var n = e.length,
            r = t.length,
            i = new Array(n + 1);
    for (var s = 0; s < n + 1; ++s)
            i[s] = new Array(r + 1), i[s][0] = s;
    for (var o = 0; o < r + 1; ++o)
            i[0][o] = o;
    for (var o = 1; o < r + 1; ++o)
            for (var s = 1; s < n + 1; ++s)
                    if (e[s - 1] === t[o - 1])
                            i[s][o] = i[s - 1][o - 1];
                    else {
                            var u = i[s - 1][o] + 1,
                                    a = i[s][o - 1] + 1,
                                    f = i[s - 1][o - 1] + 1;
                            i[s][o] = Math.min(u, a, f)
                    }
    return i[n][r]
}

function stringSimilarity(e, t) {
    var n = Math.max(e.length, t.length);
    return n ? (n - levenshteinDistance(e, t)) / n : 0
}

function stringsAreNearlyIdentical(e, t) {
    return e === t ? !0 : stringSimilarity(e, t) > StringSimilarityToDeclareStringsNearlyIdentical
}

function elementIsCommentBlock(e) {
    if (/(^|\s)comment/.test(e.className))
            return !0;
    var t = e.getAttribute("id");
    return t && t.indexOf("comment") === 0 ? !0 : !1
}

function elementLooksLikeEmbeddedTweet(e) {
    const t = /http.+twitter.com.*status.*[0-9]+/i;
    try {
            if (e.tagName !== "IFRAME")
                    return !1;
            if (!e.contentDocument)
                    return !1;
            var n = e.contentDocument.documentElement,
                    r = 0,
                    i = n.querySelector("blockquote");
            return i && t.test(i.getAttribute("cite")) && ++r, e.classList.contains("twitter-tweet") && ++r, n.querySelector("[data-iframe-title='Embedded Tweet']") && ++r, n.querySelector("[data-tweet-id]") && ++r, r > 2
    } catch (e) {
            return !1;
    }
}

function elementLooksLikePartOfACarousel(e) {
    const t = /carousel-|carousel_|-carousel|_carousel/,
            n = 3;
    var r = e;
    for (var i = 0; i < n; ++i) {
            if (!r)
                    return !1;
            if (t.test(r.className) || t.test(r.getAttribute("data-analytics")))
                    return !0;
            r = r.parentElement
    }
}

function shouldPruneIframe(e, t) {
    return HostnamesKnownToContainEmbeddableMediaRegex.test(anchorForURL(e.src, t).hostname) ? !1 : elementLooksLikeEmbeddedTweet(e.originalElement) ? !1 : !0
}

function languageScoreMultiplierForTextNodes(e) {
    if (!e || !e.length)
            return 1;
    var t = Math.min(e.length, DefaultNumberOfTextNodesToCheckForLanguageMultiplier),
            n = 0,
            r = 0;
    for (var i = 0; i < t; i++) {
            var s = e[i].nodeValue.trim(),
                    o = Math.min(s.length, NumberOfCharactersPerTextNodeToEvaluateForLanguageMultiplier);
            for (var u = 0; u < o; u++)
                    characterNeedsScoreMultiplier(s[u]) && n++;
            r += o
    }
    return n >= r * MinimumRatioOfCharactersForLanguageMultiplier ? ScoreMultiplierForChineseJapaneseKorean : 1
}

function scoreMultiplierForElementTagNameAndAttributes(e) {
    var t = 1;
    for (var n = e; n; n = n.parentElement) {
            var r = n.getAttribute("id");
            r && (ArticleRegEx.test(r) && (t += ArticleMatchBonus), CommentRegEx.test(r) && (t -= CommentMatchPenalty));
            var i = n.className;
            i && (ArticleRegEx.test(i) && (t += ArticleMatchBonus), CommentRegEx.test(i) && (t -= CommentMatchPenalty)), n.tagName === "ARTICLE" && (t += ArticleMatchBonus)
    }
    return t < 0 ? 0 : t
}

function elementAtPoint(e, t) {
    if (typeof ReaderArticleFinderJSController != "undefined" && ReaderArticleFinderJSController.nodeAtPoint) {
            var n = ReaderArticleFinderJSController.nodeAtPoint(e, t);
            return n && n.nodeType !== Node.ELEMENT_NODE && (n = n.parentElement), n
    }
    return document.elementFromPoint(e, t)
}

function userVisibleURLString(e) {
    return typeof ReaderArticleFinderJSController != "undefined" && ReaderArticleFinderJSController.userVisibleURLString ? ReaderArticleFinderJSController.userVisibleURLString(e) : e
}

function anchorForURL(e, t) {
    var n = t.createElement("a");
    return n.href = e, n
}

function anchorLinksToAttachment(e) {
    return /\battachment\b/i.test(e.getAttribute("rel"))
}

function anchorLinksToTagOrCategoryPage(e) {
    return /\bcategory|tag\b/i.test(e.getAttribute("rel"))
}

function elementsHaveSameTagAndClassNames(e, t) {
    return e.tagName === t.tagName && e.className === t.className
}

function selectorForElement(e) {
    var t = e.tagName,
            n = e.classList,
            r = n.length;
    for (var i = 0; i < r; i++)
            t += "." + n[i];
    return t
}

function elementFingerprintForDepth(e, t) {
    function s(e, t) {
            if (!e)
                    return "";
            var o = [];
            o.push(selectorForElement(e));
            var u = e.children,
                    a = u.length;
            if (a && t > 0) {
                    o.push(n);
                    for (var f = 0; f < a; ++f)
                            o.push(s(u[f], t - 1)), f !== a - 1 && o.push(i);
                    o.push(r)
            }
            return o.join("")
    }
    const n = " / ",
            r = " \\",
            i = " | ";
    return s(e, t)
}

function childrenOfParentElement(e) {
    var t = e.parentElement;
    return t ? t.children : []
}

function arrayOfKeysAndValuesOfObjectSortedByValueDescending(e) {
    var t = [];
    for (var n in e)
            e.hasOwnProperty(n) && t.push({
                    key: n,
                    value: e[n]
            });
    return t.sort(function (e, t) {
            return t.value - e.value
    }), t
}

function walkElementSubtree(e, t, n) {
    if (t < 0)
            return;
    var r = e.children,
            i = r.length,
            s = t - 1;
    for (var o = 0; o < i; ++o)
            walkElementSubtree(r[o], s, n);
    n(e, t)
}

function childrenWithParallelStructure(e) {
    var t = e.children;
    if (!t)
            return [];
    var n = t.length;
    if (!n)
            return [];
    var r = {};
    for (var i = 0; i < n; ++i) {
            var s = t[i];
            if (CandidateTagNamesToIgnore[s.tagName] || !s.className)
                    continue;
            var o = s.classList,
                    u = o.length;
            for (var a = 0; a < u; ++a) {
                    var f = o[a],
                            l = r[f];
                    l ? l.push(s) : r[f] = [s]
            }
    }
    var c = Math.floor(n / 2);
    for (var f in r) {
            var l = r[f];
            if (l.length > c)
                    return l
    }
    return []
}
const ReaderMinimumScore = 1600,
    ReaderMinimumAdvantage = 15,
    ArticleMinimumScoreDensity = 4.25,
    BlacklistedHostsAllowedPathRegexMap = {
            "www.apple.com": /^\/([a-z]{2,4}\/){0,2}pr\/|^\/hotnews\//
    },
    ListOfHostnameAndTrustedArticleNodeSelectorPairs = [
            [/.*\.apple.com$/, "article"]
    ],
    CandidateMinimumWidth = 280,
    CandidateMinimumHeight = 295,
    CandidateMinimumArea = 17e4,
    CandidateMaximumTop = 1300,
    CandidateMinimumWidthPortionForIndicatorElements = .5,
    CandidateMinumumListItemLineCount = 4,
    CandidateTagNamesToIgnore = {
            A: 1,
            EMBED: 1,
            FORM: 1,
            HTML: 1,
            IFRAME: 1,
            OBJECT: 1,
            OL: 1,
            OPTION: 1,
            SCRIPT: 1,
            STYLE: 1,
            svg: 1,
            UL: 1
    },
    PrependedArticleCandidateMinimumHeight = 50,
    AppendedArticleCandidateMinimumHeight = 200,
    AppendedArticleCandidateMaximumVerticalDistanceFromArticle = 150,
    StylisticClassNames = {
            justfy: 1,
            justify: 1,
            left: 1,
            right: 1,
            small: 1
    },
    CommentRegEx = /comment|meta|footer|footnote/,
    CommentMatchPenalty = .75,
    ArticleRegEx = /(?:(?:^|\s)(?:(post|hentry|entry)[-_]?(?:content|text|body)?|article[-_]?(?:content|text|body|page)?)(?:\s|$))/i,
    ArticleMatchBonus = .5,
    DensityExcludedElementSelector = "#disqus_thread, #comments, .userComments",
    AttributesToRemoveRegEx = /^on|^id$|^class$|^style$/,
    PositiveRegEx = /article|body|content|entry|hentry|page|pagination|post|text/i,
    NegativeRegEx = /advertisement|breadcrumb|combx|comment|contact|disqus|footer|link|meta|mod-conversations|promo|related|scroll|share|shoutbox|sidebar|social|sponsor|subscribe|tags|toolbox|widget|_ad$/i,
    VeryPositiveClassNameRegEx = /instapaper_body/,
    VeryNegativeClassNameRegEx = /instapaper_ignore/,
    SharingRegex = /email|print|rss|digg|slashdot|delicious|reddit|share/i,
    HostnamesKnownToContainEmbeddableMediaRegex = /youtube|vimeo|dailymotion/,
    MinimumAverageDistanceBetweenHRElements = 400,
    MinimumAverageDistanceBetweenHeaderElements = 400,
    PortionOfCandidateHeightToIgnoreForHeaderCheck = .1,
    DefaultNumberOfTextNodesToCheckForLanguageMultiplier = 3,
    NumberOfCharactersPerTextNodeToEvaluateForLanguageMultiplier = 12,
    MinimumRatioOfCharactersForLanguageMultiplier = .5,
    ScoreMultiplierForChineseJapaneseKorean = 3,
    MinimumContentMediaHeight = 150,
    MinimumContentMediaWidthToArticleWidthRatio = .25,
    MaximumContentMediaAreaToArticleAreaRatio = .2,
    LinkContinueMatchRegEx = /continue/gi,
    LinkNextMatchRegEx = /next/gi,
    LinkPageMatchRegEx = /page/gi,
    LinkListItemBonus = 5,
    LinkPageMatchBonus = 10,
    LinkNextMatchBonus = 15,
    LinkContinueMatchBonus = 15,
    LinkNextOrdinalValueBase = 3,
    LinkMismatchValueBase = 2,
    LinkMatchWeight = 200,
    LinkMaxVerticalDistanceFromArticle = 200,
    LinkVerticalDistanceFromArticleWeight = 150,
    LinkCandidateXPathQuery = "descendant-or-self::*[(not(@id) or (@id!='disqus_thread' and @id!='comments')) and (not(@class) or @class!='userComments')]/a",
    LinkDateRegex = /\D(?:\d\d(?:\d\d)?[\-\/](?:10|11|12|0?[1-9])[\-\/](?:30|31|[12][0-9]|0?[1-9])|\d\d(?:\d\d)?\/(?:10|11|12|0[1-9])|(?:10|11|12|0?[1-9])\-(?:30|31|[12][0-9]|0?[1-9])\-\d\d(?:\d\d)?|(?:30|31|[12][0-9]|0?[1-9])\-(?:10|11|12|0?[1-9])\-\d\d(?:\d\d)?)\D/,
    LinkURLSearchParameterKeyMatchRegex = /(page|^p$|^pg$)/i,
    LinkURLPageSlashNumberMatchRegex = /\/.*page.*\/\d+/i,
    LinkURLSlashDigitEndMatchRegex = /\/\d+\/?$/,
    LinkURLArchiveSlashDigitEndMatchRegex = /archives?\/\d+\/?$/,
    LinkURLBadSearchParameterKeyMatchRegex = /author|comment|feed|id|nonce|related/i,
    LinkURLSemanticMatchBonus = 100,
    LinkMinimumURLSimilarityRatio = .75,
    HeaderMinimumDistanceFromArticleTop = 200,
    HeaderLevenshteinDistanceToLengthRatio = .75,
    MinimumRatioOfListItemsBeingRelatedToSharingToPruneEntireList = .5,
    FloatMinimumHeight = 130,
    ImageSizeTiny = 32,
    ToleranceForLeadingImageWidthToArticleWidthForFullWidthPresentation = 50,
    MaximumFloatWidth = 325,
    AnchorImageMinimumWidth = 100,
    AnchorImageMinimumHeight = 100,
    MinimumHeightForImagesAboveTheArticleTitle = 50,
    MainImageMinimumWidthAndHeight = 83,
    BaseFontSize = 16,
    BaseLineHeightRatio = 1.125,
    MaximumExactIntegralValue = 9007199254740992,
    TitleCandidateDepthScoreMultiplier = .1,
    DocumentPositionDisconnected = 1,
    DocumentPositionPreceding = 2,
    DocumentPositionFollowing = 4,
    DocumentPositionContains = 8,
    DocumentPositionContainedBy = 16,
    TextNodeLengthPower = 1.25,
    KnownImageLazyLoadingAttributes = {
            "data-lazy-src": 1,
            "data-original": 1,
            "data-src": 1,
            "original-src": 1,
            "rel:bf_image_src": 1
    },
    StringSimilarityToDeclareStringsNearlyIdentical = .97;
CandidateElement = function (e, t) {
    this.element = e, this.contentDocument = t, this.textNodes = this.usableTextNodesInElement(this.element), this.rawScore = this.calculateRawScore(), this.tagNameAndAttributesScoreMultiplier = this.calculateElementTagNameAndAttributesScoreMultiplier(), this.languageScoreMultiplier = 0, this.depthInDocument = 0
}, CandidateElement.extraArticleCandidateIfElementIsViable = function (t, n, r, i) {
    const s = "a, b, strong, i, em, u, span";
    var o = cachedElementBoundingRect(t),
            u = cachedElementBoundingRect(n.element);
    if (i && o.height < PrependedArticleCandidateMinimumHeight || !i && o.height < AppendedArticleCandidateMinimumHeight)
            if (t.childElementCount && t.querySelectorAll("*").length !== t.querySelectorAll(s).length)
                    return null;
    if (i) {
            if (o.bottom > u.top)
                    return null
    } else if (o.top < u.bottom)
            return null;
    if (!i) {
            var a = o.top - u.bottom;
            if (a > AppendedArticleCandidateMaximumVerticalDistanceFromArticle)
                    return null
    }
    if (o.left > u.right || o.right < u.left)
            return null;
    if (elementLooksLikePartOfACarousel(t))
            return null;
    var f = new CandidateElement(t, r);
    return f.isPrepended = i, f
}, CandidateElement.candidateIfElementIsViable = function (t, n, r) {
    var i = cachedElementBoundingRect(t);
    return i.width < CandidateMinimumWidth || i.height < CandidateMinimumHeight ? null : i.width * i.height < CandidateMinimumArea ? null : !r && i.top > CandidateMaximumTop ? null : CandidateElement.candidateElementAdjustedHeight(t) < CandidateMinimumHeight ? null : new CandidateElement(t, n)
}, CandidateElement.candidateElementAdjustedHeight = function (t) {
    var n = cachedElementBoundingRect(t),
            r = n.height,
            i = t.getElementsByTagName("form"),
            s = i.length;
    for (var o = 0; o < s; ++o) {
            var u = i[o],
                    a = cachedElementBoundingRect(u);
            a.width > n.width * CandidateMinimumWidthPortionForIndicatorElements && (r -= a.height)
    }
    var f = t.querySelectorAll("ol, ul"),
            l = f.length,
            c = null;
    for (var o = 0; o < l; ++o) {
            var h = f[o];
            if (c && c.compareDocumentPosition(h) & DocumentPositionContainedBy)
                    continue;
            var p = h.getElementsByTagName("li"),
                    d = p.length,
                    v = cachedElementBoundingRect(h);
            if (!d) {
                    r -= v.height;
                    continue
            }
            var m = v.height / d,
                    g = getComputedStyle(p[0]),
                    y = parseInt(g.lineHeight);
            if (isNaN(y)) {
                    var b = fontSizeFromComputedStyle(g);
                    y = b * BaseLineHeightRatio
            }
            v.width > n.width * CandidateMinimumWidthPortionForIndicatorElements && m / y < CandidateMinumumListItemLineCount && (r -= v.height, c = h)
    }
    return r
}, CandidateElement.prototype = {
    calculateRawScore: function () {
            var t = 0,
                    n = this.textNodes,
                    r = n.length;
            for (var i = 0; i < r; ++i)
                    t += this.rawScoreForTextNode(n[i]);
            return t
    },
    calculateElementTagNameAndAttributesScoreMultiplier: function () {
            return scoreMultiplierForElementTagNameAndAttributes(this.element)
    },
    calculateLanguageScoreMultiplier: function () {
            if (this.languageScoreMultiplier !== 0)
                    return;
            this.languageScoreMultiplier = languageScoreMultiplierForTextNodes(this.textNodes)
    },
    depth: function () {
            return this.depthInDocument || (this.depthInDocument = elementDepth(this.element)), this.depthInDocument
    },
    finalScore: function () {
            return this.calculateLanguageScoreMultiplier(), this.basicScore() * this.languageScoreMultiplier
    },
    basicScore: function () {
            return this.rawScore * this.tagNameAndAttributesScoreMultiplier
    },
    scoreDensity: function () {
            var t = 0,
                    n = this.element.querySelector(DensityExcludedElementSelector);
            n && (t = n.clientWidth * n.clientHeight);
            var r = this.element.children || [],
                    i = r.length;
            for (var s = 0; s < i; ++s) {
                    var o = r[s];
                    elementIsCommentBlock(o) && (t += o.clientWidth * o.clientHeight)
            }
            var u = cachedElementBoundingRect(this.element).width * cachedElementBoundingRect(this.element).height,
                    a = u * MaximumContentMediaAreaToArticleAreaRatio,
                    f = cachedElementBoundingRect(this.element).width * MinimumContentMediaWidthToArticleWidthRatio,
                    l = this.element.querySelectorAll("img, object, video"),
                    c = l.length;
            for (var s = 0; s < c; ++s) {
                    var h = cachedElementBoundingRect(l[s]);
                    if (h.width >= f && h.height > MinimumContentMediaHeight) {
                            var p = h.width * h.height;
                            p < a && (t += p)
                    }
            }
            var d = this.basicScore(),
                    v = u - t,
                    m = this.textNodes.length,
                    g = 0,
                    y = 0;
            for (var s = 0; s < m; ++s) {
                    var b = this.textNodes[s].parentNode;
                    b && (y += fontSizeFromComputedStyle(getComputedStyle(b)), g++)
            }
            var w = BaseFontSize;
            return g && (w = y /= g), this.calculateLanguageScoreMultiplier(), d / v * 1e3 * (w / BaseFontSize) * this.languageScoreMultiplier
    },
    usableTextNodesInElement: function (t) {
            var n = [];
            if (!t)
                    return n;
            const r = {
                    A: 1,
                    DD: 1,
                    DT: 1,
                    NOSCRIPT: 1,
                    OL: 1,
                    OPTION: 1,
                    PRE: 1,
                    SCRIPT: 1,
                    STYLE: 1,
                    TD: 1,
                    UL: 1,
                    IFRAME: 1
            };
            var i = this.contentDocument,
                    s = function (e) {
                            const t = "text()|*/text()|*/a/text()|*/li/text()|*/span/text()|*/em/text()|*/i/text()|*/strong/text()|*/b/text()|*/font/text()|blockquote/*/text()|div[count(./p)=count(./*)]/p/text()";
                            var s = i.evaluate(t, e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                                    o = s.snapshotLength;
                            for (var u = 0; u < o; ++u) {
                                    var a = s.snapshotItem(u);
                                    if (r[a.parentNode.tagName] || a._countedTextNode || isNodeWhitespace(a))
                                            continue;
                                    a._countedTextNode = !0, n.push(a)
                            }
                    };
            s(t);
            var o = childrenWithParallelStructure(t),
                    u = o.length;
            for (var a = 0; a < u; ++a) {
                    var f = o[a];
                    s(f)
            }
            var l = n.length;
            for (var a = 0; a < l; ++a)
                    delete n[a]._countedTextNode;
            return n
    },
    addTextNodesFromCandidateElement: function (t) {
            var n = this.textNodes.length;
            for (var r = 0; r < n; ++r)
                    this.textNodes[r].alreadyCounted = !0;
            var i = t.textNodes,
                    s = i.length;
            for (var r = 0; r < s; ++r)
                    i[r].alreadyCounted || this.textNodes.push(i[r]);
            var n = this.textNodes.length;
            for (var r = 0; r < n; ++r)
                    this.textNodes[r].alreadyCounted = null;
            this.rawScore = this.calculateRawScore()
    },
    rawScoreForTextNode: function (t) {
            const n = 20;
            if (!t)
                    return 0;
            var r = t.length;
            if (r < n)
                    return 0;
            var i = t.parentNode;
            if (!isElementVisible(i))
                    return 0;
            var s = 1;
            while (i && i !== this.element)
                    s -= .1, i = i.parentNode;
            return Math.pow(r * s, TextNodeLengthPower)
    },
    shouldDisqualifyDueToScoreDensity: function () {
            return this.scoreDensity() < ArticleMinimumScoreDensity ? !0 : !1
    },
    shouldDisqualifyDueToHorizontalRuleDensity: function () {
            var t = this.element.getElementsByTagName("hr"),
                    n = t.length,
                    r = 0,
                    i = cachedElementBoundingRect(this.element),
                    s = i.width * .7;
            for (var o = 0; o < n; ++o)
                    t[o].clientWidth > s && r++;
            if (r) {
                    var u = i.height / r;
                    if (u < MinimumAverageDistanceBetweenHRElements)
                            return !0
            }
            return !1
    },
    shouldDisqualifyDueToHeaderDensity: function () {
            var t = "(h1|h2|h3|h4|h5|h6|*/h1|*/h2|*/h3|*/h4|*/h5|*/h6)[a[@href]]",
                    n = this.contentDocument.evaluate(t, this.element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                    r = n.snapshotLength;
            if (r > 2) {
                    var i = 0,
                            s = cachedElementBoundingRect(this.element),
                            o = s.height * PortionOfCandidateHeightToIgnoreForHeaderCheck;
                    for (var u = 0; u < r; ++u) {
                            var a = n.snapshotItem(u),
                                    f = cachedElementBoundingRect(a);
                            f.top - s.top > o && s.bottom - f.bottom > o && i++
                    }
                    var l = s.height / i;
                    if (l < MinimumAverageDistanceBetweenHeaderElements)
                            return !0
            }
            return !1
    },
    shouldDisqualifyDueToSimilarElements: function (t) {
            function i(e) {
                    return !!{
                                    H1: 1,
                                    H2: 1,
                                    H3: 1,
                                    H4: 1,
                                    H5: 1,
                                    H6: 1
                            }
                            [e.tagName]
            }

            function s(e, t) {
                    if (!e || !t)
                            return !1;
                    const n = 1;
                    return e.className ? e.className === t.className : elementFingerprintForDepth(e, n) === elementFingerprintForDepth(t, n)
            }
            const n = /clearfix/i,
                    r = "h1, h2, h3, h4, h5, h6";
            var o = this.element;
            if (o.tagName === "LI" || o.tagName === "DD") {
                    var u = o.parentNode,
                            a = u.children.length;
                    for (var f = 0; f < a; ++f) {
                            var l = u.children[f];
                            if (l.tagName === o.tagName && l.className === o.className && l !== o)
                                    return !0
                    }
            }
            var c = o.getAttribute("class");
            c || (o = o.parentElement, o && (c = o.getAttribute("class"), c || (o = o.parentElement, o && (c = o.getAttribute("class")))));
            if (c) {
                    t || (t = []);
                    var h = t.length;
                    for (var f = 0; f < h; ++f)
                            t[f].element.candidateElement = t[f];
                    var p;
                    try {
                            var d = c.split(" "),
                                    v = "";
                            for (var f = 0; f < d.length; ++f) {
                                    if (n.test(d[f]))
                                            continue;
                                    d[f].length && (v += "." + d[f])
                            }
                            p = this.contentDocument.querySelectorAll(v)
                    } catch (m) {
                            p = []
                    }
                    var g = !1,
                            y = elementDepth(o),
                            b = p.length;
                    for (var f = 0; f < b; ++f) {
                            var l = p[f];
                            if (l === o)
                                    continue;
                            if (l.parentElement === o || o.parentElement === l)
                                    continue;
                            if (!isElementVisible(l))
                                    continue;
                            var w = l.candidateElement;
                            if (!w) {
                                    w = new CandidateElement(l, this.contentDocument);
                                    if (!w)
                                            continue
                            }
                            if (w.basicScore() * ReaderMinimumAdvantage > this.basicScore()) {
                                    if (!g && cachedElementBoundingRect(l).bottom < cachedElementBoundingRect(this.element).top) {
                                            g = !0;
                                            continue
                                    }
                                    if (s(o.previousElementSibling, l.previousElementSibling) || s(o.nextElementSibling, l.nextElementSibling)) {
                                            var E = o.querySelector(r),
                                                    S = l.querySelector(r);
                                            if (E && S && elementsHaveSameTagAndClassNames(E, S))
                                                    return !0;
                                            E = o.previousElementSibling, S = l.previousElementSibling;
                                            if (E && S && i(E) && i(S) && elementsHaveSameTagAndClassNames(E, S))
                                                    return !0
                                    }
                                    if (elementDepth(l) === y)
                                            while (l.parentElement && o.parentElement) {
                                                    if (l.parentElement === o.parentElement)
                                                            break;
                                                    l = l.parentElement, o = o.parentElement
                                            }
                                    while (o.childElementCount <= 1) {
                                            if (!o.childElementCount || !l.childElementCount)
                                                    return !1;
                                            if (l.childElementCount > 1)
                                                    return !1;
                                            if (o.firstElementChild.tagName !== l.firstElementChild.tagName)
                                                    return !1;
                                            o = o.firstElementChild, l = l.firstElementChild
                                    }
                                    if (l.childElementCount <= 1)
                                            return !1;
                                    var S = l.firstElementChild,
                                            x = l.lastElementChild,
                                            E = o.firstElementChild,
                                            T = o.lastElementChild;
                                    if (S.tagName !== E.tagName)
                                            return !1;
                                    if (x.tagName !== T.tagName)
                                            return !1;
                                    var N = S.className,
                                            C = x.className,
                                            k = E.className,
                                            L = x.className,
                                            A = L === k ? 2 : 1;
                                    if (N.length || k.length) {
                                            if (!N.length || !k.length)
                                                    return !1;
                                            if (N === k && o.querySelectorAll("." + k.replace(/\s+/, ".")).length <= A)
                                                    return !0
                                    }
                                    if (C.length || L.length) {
                                            if (!C.length || !L.length)
                                                    return !1;
                                            if (C === L && o.querySelectorAll("." + L.replace(/\s+/, ".")).length <= A)
                                                    return !0
                                    }
                                    var O = E.clientHeight,
                                            M = T.clientHeight;
                                    return !O || !S.clientHeight ? !1 : !M || !x.clientHeight ? !1 : O === S.clientHeight || M === x.clientHeight ? !0 : !1
                            }
                    }
                    for (var f = 0; f < h; ++f)
                            t[f].element.candidateElement = null
            }
            return !1
    },
    shouldDisqualifyForDeepLinking: function () {
            function n(e) {
                    var t = e.pathname.substring(1).split("/");
                    return t[t.length - 1] || t.pop(), t
            }
            const t = 5;
            var r = this.element,
                    i = this.contentDocument.location,
                    s = n(i),
                    o = s.length,
                    u = [],
                    a = r.getElementsByTagName("a"),
                    f = a.length;
            for (var l = 0; l < f; l++) {
                    var c = a[l];
                    if (i.host !== c.host)
                            continue;
                    if (n(c).length <= o)
                            continue;
                    if ((c.host + c.pathname).indexOf(i.host + i.pathname) !== 0)
                            continue;
                    if (anchorLinksToAttachment(c))
                            continue;
                    u.push(c);
                    if (u.length < t)
                            continue;
                    var h = r.offsetTop + r.offsetHeight / t;
                    return u[0].offsetTop < h
            }
            return !1
    }
}, String.prototype.lastInteger = function () {
    const t = /[0-9]+/g;
    var n = this.match(t);
    return n ? parseInt(n[n.length - 1]) : NaN
}, String.prototype.escapeCharacters = function (e) {
    var t = !1,
            n = e.length;
    for (var r = 0; r < n; ++r)
            if (this.indexOf(e.charAt(r)) !== -1) {
                    t = !0;
                    break
            }
    if (!t)
            return this;
    var i = "",
            s = this.length;
    for (var r = 0; r < s; ++r)
            e.indexOf(this.charAt(r)) !== -1 && (i += "\\"), i += this.charAt(r);
    return i
}, String.prototype.escapeForRegExp = function () {
    return this.escapeCharacters("^[]{}()\\.$*+?|")
}, ReaderArticleFinder = function (e) {
    this.contentDocument = e, this.didSearchForArticleNode = !1, this.article = null, this.didSearchForExtraArticleNode = !1, this.extraArticle = null, this.leadingImage = null, this._cachedScrollY = 0, this._cachedScrollX = 0, this._elementsWithCachedBoundingRects = [], this._cachedContentTextStyle = null, this.pageNumber = 1, this.prefixWithDateForNextPageURL = null, this._elementsEvaluatedForTextContent = [], this.previouslyDiscoveredPageURLStrings = []
}, ReaderArticleFinder.prototype = {
    isReaderModeAvailable: function () {
            return this.canRunReaderDetection() ? this.findArticleBySearchingWhitelist() ? !0 : (this.cacheWindowScrollPosition(), this.article = this.findArticleByVisualExamination(), this.article && this.articleIsLTR(), !!this.article) : null
    },
    prepareToTransitionToReader: function () {
            this.adoptableArticle(!0), this.nextPageURL(), this.articleIsLTR()
    },
    nextPageURL: function () {
            if (!this._nextPageURL) {
                    var t = this.nextPageURLString();
                    typeof ReaderArticleFinderJSController != "undefined" && t && (t = ReaderArticleFinderJSController.substituteURLForNextPageURL(t)), this._nextPageURL = t
            }
            return this._nextPageURL
    },
    containerElementsForMultiPageContent: function () {
            const e = /(.*page.*)(\d{1,2})(.*)/i,
                    t = 3;
            var n = [],
                    r = this.articleNode(),
                    i, s = 0;
            for (;;) {
                    i = e.exec(r.getAttribute("id"));
                    if (i)
                            break;
                    r = r.parentElement;
                    if (!r || s++ === t)
                            return []
            }
            var o = childrenOfParentElement(r),
                    u = o.length;
            for (var a = 0; a < u; ++a) {
                    var f = o[a];
                    if (f === r)
                            continue;
                    var l = e.exec(f.getAttribute("id"));
                    if (!l || l[1] !== i[1] || l[3] !== i[3])
                            continue;
                    if (isElementVisible(f) && !isElementPositionedOffScreen(f))
                            continue;
                    n.push(f)
            }
            return n
    },
    adoptableMultiPageContentElements: function () {
            return this.containerElementsForMultiPageContent().map(function (e) {
                    return this.cleanArticleNode(e, e.cloneNode(!0), !1)
            }, this)
    },
    classNameIsSignificantInRouteComputation: function (t) {
            return t ? !(t.toLowerCase() in StylisticClassNames) : !1
    },
    shouldIgnoreInRouteComputation: function (t) {
            return t.tagName === "SCRIPT" || t.tagName === "LINK" || t.tagName === "STYLE" ? !0 : t.tagName !== "TR" ? !1 : t.offsetHeight ? !1 : !0
    },
    routeToArticleNode: function () {
            var t = [],
                    n = this.articleNode();
            while (n) {
                    var r = {};
                    r.tagName = n.tagName;
                    var i = n.getAttribute("id");
                    i && (r.id = i), this.classNameIsSignificantInRouteComputation(n.className) && (r.className = n.className), r.index = 1;
                    for (var s = n.previousElementSibling; s; s = s.previousElementSibling)
                            this.shouldIgnoreInRouteComputation(s) || r.index++;
                    t.unshift(r), n = n.parentElement
            }
            return t
    },
    adjustArticleNode: function () {
            if (!this.article)
                    return;
            var t;
            for (t = this.article.element; t; t = t.parentElement)
                    if (VeryPositiveClassNameRegEx.test(t.className)) {
                            this.article.element = t;
                            return
                    }
            t = this.article.element;
            if (t.tagName === "SECTION" && t.parentElement && t.parentElement.getAttribute("itemprop") === "articleBody") {
                    this.article.element = t.parentElement;
                    return
            }
            t = this.article.element;
            if (t.getAttribute("id") || !t.className)
                    return;
            var n = t.tagName,
                    r = t.className,
                    i = t.parentElement,
                    s = i.children;
            for (var o = 0, u = s.length; o < u; ++o) {
                    var a = s[o];
                    if (a === t)
                            continue;
                    if (a.tagName !== n || a.className !== r)
                            continue;
                    var f = CandidateElement.candidateIfElementIsViable(a, this.contentDocument, !0);
                    if (!f || f.finalScore() < ReaderMinimumScore)
                            continue;
                    this.article.element = i;
                    return
            }
    },
    findArticleBySearchingWhitelist: function () {
            var t = ListOfHostnameAndTrustedArticleNodeSelectorPairs.length;
            for (var n = 0; n < t; ++n) {
                    var r = ListOfHostnameAndTrustedArticleNodeSelectorPairs[n],
                            i = r[0];
                    if (!i.test(this.contentDocument.location.hostname))
                            continue;
                    var s = r[1],
                            o = this.contentDocument.querySelectorAll(s);
                    if (o.length === 1)
                            return new CandidateElement(o[0], this.contentDocument)
            }
            return null
    },
    articleNode: function (t) {
            return this.didSearchForArticleNode || (this.article = this.findArticleBySearchingWhitelist(), this.article || (this.article = this.findArticleBySearchingAllElements()), this.article || (this.article = this.findArticleByVisualExamination()), !this.article && t && (this.article = this.findArticleBySearchingAllElements(!0)), this.adjustArticleNode(), this.didSearchForArticleNode = !0, this.article && this.articleIsLTR()), this.article ? this.article.element : null
    },
    extraArticleNode: function () {
            return this.didSearchForArticleNode || this.articleNode(), this.didSearchForExtraArticleNode || (this.extraArticle = this.findExtraArticle(), this.didSearchForExtraArticleNode = !0), this.extraArticle ? this.extraArticle.element : null
    },
    cacheWindowScrollPosition: function () {
            this._cachedScrollY = window.scrollY, this._cachedScrollX = window.scrollX
    },
    contentTextStyle: function () {
            return this._cachedContentTextStyle ? this._cachedContentTextStyle : (this._cachedContentTextStyle = contentTextStyleForNode(this.contentDocument, this.articleNode()), this._cachedContentTextStyle || (this._cachedContentTextStyle = getComputedStyle(this.articleNode())), this._cachedContentTextStyle)
    },
    commaCountIsLessThan: function (t, n) {
            var r = 0,
                    i = t.textContent,
                    s = -1;
            while (r < n && (s = i.indexOf(",", s + 1)) >= 0)
                    r++;
            return r < n
    },
    calculateLinkDensity: function (t) {
            var n = removeWhitespace(t.textContent).length;
            if (!n)
                    return 0;
            var r = t.getElementsByTagName("a"),
                    i = 0,
                    s = r.length;
            for (var o = 0; o < s; ++o)
                    i += removeWhitespace(r[o].textContent).length;
            return i / n
    },
    shouldPruneElement: function (t, n) {
            const r = .33,
                    i = .5,
                    s = .2,
                    o = 25,
                    u = 4e4;
            var a = t.tagName;
            if (!t.parentElement)
                    return !1;
            if (a === "IFRAME")
                    return shouldPruneIframe(t, this.contentDocument);
            if (a !== "OBJECT" && a !== "EMBED" && a !== "CANVAS") {
                    var f = !1,
                            l = t.childNodes.length;
                    for (var c = 0; c < l; ++c) {
                            var h = t.childNodes[c],
                                    p = h.nodeType;
                            if (p === Node.ELEMENT_NODE || p === Node.TEXT_NODE && !isNodeWhitespace(h)) {
                                    f = !0;
                                    break
                            }
                    }
                    if (!f) {
                            if (a === "P") {
                                    var d = t.previousSibling,
                                            v = t.nextSibling;
                                    if (d && d.nodeType === Node.TEXT_NODE && !isNodeWhitespace(d) && v && v.nodeType === Node.TEXT_NODE && !isNodeWhitespace(v))
                                            return !1
                            }
                            return !0
                    }
                    if (a === "P")
                            return !1
            }
            if (a === "CANVAS")
                    return t.parentNode.tagName === "CUFON";
            var m = 0;
            if (n) {
                    if (VeryNegativeClassNameRegEx.test(n.className))
                            return !0;
                    var g = n.className,
                            y = n.getAttribute("id");
                    PositiveRegEx.test(g) && m++, PositiveRegEx.test(y) && m++, NegativeRegEx.test(g) && m--, NegativeRegEx.test(y) && m--
            }
            if (m < 0)
                    return !0;
            if (t.querySelector(".tweet-wrapper"))
                    return !1;
            if (a === "UL" || a === "OL") {
                    if (n.querySelector("iframe") && n.querySelector("script"))
                            return !0;
                    var b = n.children,
                            w = b.length;
                    if (!w)
                            return !0;
                    var E = 0,
                            S = 0;
                    for (var c = 0; c < w; ++c)
                            SharingRegex.test(b[c].className) && E++, NegativeRegEx.test(b[c].className) && S++;
                    return E / w >= MinimumRatioOfListItemsBeingRelatedToSharingToPruneEntireList ? !0 : S / w >= MinimumRatioOfListItemsBeingRelatedToSharingToPruneEntireList ? !0 : !1
            }
            if (a === "OBJECT") {
                    var x = t.querySelector("embed[src]"),
                            T = x ? anchorForURL(x.src, this.contentDocument) : null;
                    if (T && HostnamesKnownToContainEmbeddableMediaRegex.test(T.hostname))
                            return !1;
                    var N = t.getAttribute("data");
                    return T = N ? anchorForURL(N, this.contentDocument) : null, T && HostnamesKnownToContainEmbeddableMediaRegex.test(T.hostname) ? !1 : !0
            }
            if (t.childElementCount === 1) {
                    var C = t.firstElementChild;
                    if (C.tagName === "A")
                            return !1;
                    if (C.tagName === "SPAN" && C.className === "converted-anchor" && nearestAncestorElementWithTagName(C, "TABLE"))
                            return !1
            }
            var k = t.getElementsByTagName("img"),
                    L = k.length;
            if (L) {
                    var A = 0;
                    for (var c = 0; c < L; ++c) {
                            var O = k[c].originalElement;
                            if (!isElementVisible(O))
                                    continue;
                            var M = cachedElementBoundingRect(O);
                            A += M.width / L * (M.height / L)
                    }
                    if (A > u)
                            return !1
            }
            if (!this.commaCountIsLessThan(t, 10))
                    return !1;
            var _ = t.getElementsByTagName("p").length,
                    D = t.getElementsByTagName("br").length,
                    P = _ + Math.floor(D / 2);
            if (L > P)
                    return !0;
            if (t.getElementsByTagName("li").length > P)
                    return !0;
            if (t.getElementsByTagName("input").length / P > r)
                    return !0;
            if (t.textContent.length < o && L !== 1)
                    return !0;
            if (t.querySelector("embed"))
                    return !0;
            var H = this.calculateLinkDensity(t);
            if (m >= 1 && H > i)
                    return !0;
            if (m < 1 && H > s)
                    return !0;
            if (a === "TABLE") {
                    var B = removeWhitespace(t.innerText).length,
                            j = removeWhitespace(n.innerText).length;
                    if (B <= j * .5)
                            return !0
            }
            return !1
    },
    wordCountIsLessThan: function (t, n) {
            var r = 0,
                    i = t.textContent,
                    s = -1;
            while ((s = i.indexOf(" ", s + 1)) >= 0 && r < n)
                    r++;
            return r < n
    },
    leadingImageIsAppropriateWidth: function (t) {
            return !this.article || !t ? !1 : t.getBoundingClientRect().width >= this.article.element.getBoundingClientRect().width - ToleranceForLeadingImageWidthToArticleWidthForFullWidthPresentation
    },
    newDivFromNode: function (t) {
            var n = this.contentDocument.createElement("div");
            return t && (n.innerHTML = t.innerHTML), n
    },
    adoptableLeadingImage: function () {
            const t = 5,
                    n = /credit/,
                    r = /caption/,
                    i = /src|alt/;
            if (!this.article || !this.leadingImage || !this.leadingImageIsAppropriateWidth(this.leadingImage))
                    return null;
            var s = this.leadingImage.parentNode,
                    o = null,
                    u = null,
                    a = s.children.length;
            if (s.tagName === "DIV" && a > 1 && a < t) {
                    var f = s.cloneNode(!0).querySelectorAll("p, div"),
                            l = f.length;
                    for (var c = 0; c < l; ++c) {
                            var h = f[c];
                            n.test(h.className) ? o = h.cloneNode(!0) : r.test(h.className) && (u = h.cloneNode(!0))
                    }
            }
            var p = this.leadingImage.cloneNode(!1),
                    d = p.attributes;
            for (var c = 0; c < d.length; ++c) {
                    var v = d[c].nodeName;
                    i.test(v) || (p.removeAttribute(v), c--)
            }
            var m = this.contentDocument.createElement("div");
            m.className = "leading-image", m.appendChild(p);
            if (o) {
                    var g = this.newDivFromNode(o);
                    g.className = "credit", m.appendChild(g)
            }
            if (u) {
                    var y = this.newDivFromNode(u);
                    y.className = "caption", m.appendChild(y)
            }
            return m
    },
    adoptableArticle: function (t) {
            if (this._adoptableArticle)
                    return this._adoptableArticle.cloneNode(!0);
            clearCachedElementBoundingRects(), this.cacheWindowScrollPosition();
            var n = this.articleNode(t);
            this._adoptableArticle = n ? n.cloneNode(!0) : null;
            if (!this._adoptableArticle)
                    return this._adoptableArticle;
            this._articleBoundingRect = cachedElementBoundingRect(this.article.element), this._adoptableArticle = this.cleanArticleNode(n, this._adoptableArticle, !1);
            if (this._adoptableArticle.tagName === "P") {
                    var r = document.createElement("div");
                    r.appendChild(this._adoptableArticle), this._adoptableArticle = r
            }
            var i = this.extraArticleNode();
            if (i) {
                    var s = this.cleanArticleNode(i, i.cloneNode(!0), !0);
                    s && (this.extraArticle.isPrepended ? this._adoptableArticle.insertBefore(s, this._adoptableArticle.firstChild) : this._adoptableArticle.appendChild(s));
                    var o = cachedElementBoundingRect(this.article.element),
                            u = cachedElementBoundingRect(this.extraArticle.element),
                            a = {
                                    top: Math.min(o.top, u.top),
                                    right: Math.max(o.right, u.right),
                                    bottom: Math.max(o.bottom, u.bottom),
                                    left: Math.min(o.left, u.left)
                            };
                    a.width = a.right - a.left, a.height = a.bottom - a.top, this._articleBoundingRect = a
            }
            this._articleTextContent = this._adoptableArticle.innerText;
            var f = this.adoptableLeadingImage();
            return f && this._adoptableArticle.insertBefore(f, this._adoptableArticle.firstChild), this._adoptableArticle
    },
    elementPinToEdge: function (t) {
            const n = {
                            AREA: 1,
                            BR: 1,
                            CANVAS: 1,
                            EMBED: 1,
                            FRAME: 1,
                            HR: 1,
                            IMG: 1,
                            INPUT: 1
                    },
                    r = 120;
            if (window.scrollY < r)
                    return null;
            var i = cachedElementBoundingRect(t),
                    s = t.ownerDocument.elementFromPoint((i.left + i.right) / 2, 0);
            s && s.tagName in n && (s = s.parentElement);
            var o = s;
            while (o && o !== t)
                    o = o.parentNode;
            return o ? s : null
    },
    dominantContentSelectorAndDepth: function (e) {
            const t = 2;
            var n = {},
                    r = {};
            walkElementSubtree(e, t, function (e, t) {
                    if (!isElementVisible(e))
                            return;
                    var i = selectorForElement(e) + " | " + t;
                    r[i] ? r[i] += 1 : (r[i] = 1, n[i] = e)
            });
            var i, s = arrayOfKeysAndValuesOfObjectSortedByValueDescending(r);
            switch (s.length) {
                    case 0:
                            break;
                    case 1:
                            i = s[0].key;
                            break;
                    default:
                            var o = s[0];
                            o.value > s[1].value && (i = o.key)
            }
            if (!i)
                    return null;
            var u = n[i];
            return {
                    selector: selectorForElement(u),
                    depth: depthOfElementWithinElement(u, e)
            }
    },
    functionToPreventPruningElementDueToInvisibility: function () {
            const e = [
                    [/nytimes.com/, function (e, t) {
                            var n = e;
                            if (!t)
                                    return !1;
                            while (n && n !== t) {
                                    if (n.classList.contains("hidden"))
                                            return !0;
                                    n = n.parentElement
                            }
                            return !1
                    }]
            ];
            var t = e.length;
            for (var n = 0; n < t; ++n) {
                    var r = e[n],
                            i = r[0];
                    if (i.test(this.contentDocument.location.hostname))
                            return r[1]
            }
            return function () {
                    return !1
            }
    },
    cleanArticleNode: function (t, n, r) {
            function S(e) {
                    f += e, l && (l += e), c && (c += e), h && (h += e), p && (p += e)
            }

            function x() {
                    l === 1 && (l = 0), c === 1 && (c = 0), h === 1 && (h = 0), p === 1 && (p = 0)
            }

            function T() {
                    const e = .8;
                    var n = cachedElementBoundingRect(t);
                    if (n.width === 0 || n.height === 0)
                            return !0;
                    var r = childrenWithParallelStructure(t),
                            i = r.length,
                            s;
                    if (i) {
                            s = [];
                            for (var o = 0; o < i; ++o) {
                                    var u = r[o];
                                    if (getComputedStyle(u).float === "none") {
                                            var a = u.children,
                                                    f = a.length;
                                            for (var l = 0; l < f; ++l)
                                                    s.push(a[l])
                                    } else
                                            s.push(u)
                            }
                    } else
                            s = t.children;
                    var c = s.length,
                            h = 0;
                    for (var o = 0; o < c; ++o) {
                            var p = s[o];
                            getComputedStyle(p).float !== "none" && (h += p.innerText.length)
                    }
                    var d = t.innerText.length,
                            v = h / d;
                    return v > e
            }

            function N(e) {
                    const n = 50;
                    if (cachedElementBoundingRect(e).height > n)
                            return !1;
                    const r = {
                            UL: 1,
                            LI: 1,
                            NAV: 1
                    };
                    return r[e.tagName] ? !0 : e.parentElement === t && !e.nextElementSibling ? !0 : !1
            }
            const i = {
                            FORM: 1,
                            SCRIPT: 1,
                            STYLE: 1,
                            LINK: 1
                    },
                    s = {
                            DIV: 1,
                            TABLE: 1,
                            OBJECT: 1,
                            UL: 1,
                            CANVAS: 1,
                            P: 1,
                            IFRAME: 1,
                            ASIDE: 1,
                            SECTION: 1,
                            FOOTER: 1,
                            NAV: 1,
                            OL: 1
                    },
                    o = {
                            I: 1,
                            EM: 1
                    },
                    u = {
                            B: 1,
                            STRONG: 1,
                            H1: 1,
                            H2: 1,
                            H3: 1,
                            H4: 1,
                            H5: 1,
                            H6: 1
                    };
            var a = [],
                    f = 0,
                    l = 0,
                    c = 0,
                    h = 0,
                    p = 0,
                    d = t,
                    v = d.ownerDocument.defaultView,
                    m = n,
                    g = this.articleTitle(),
                    y = this._articleTitleElement,
                    b = this.elementPinToEdge(t),
                    w = null,
                    E = isElementVisible(t),
                    C = this.dominantContentSelectorAndDepth(t),
                    k = T(),
                    L = new Set;
            this.previouslyDiscoveredPageURLStrings.forEach(function (e) {
                    L.add(e)
            });
            var A = this.nextPageURL();
            A && L.add(A);
            var O = null;
            this._articleTitleElement && (O = cachedElementBoundingRect(this._articleTitleElement));
            var M = this.functionToPreventPruningElementDueToInvisibility();
            while (d) {
                    var _ = null,
                            D = m.tagName;
                    m.originalElement = d, d === b && (w = m), D in i && (_ = m), !_ && d === y && (_ = m);
                    if (!_ && (D === "H1" || D === "H2")) {
                            var P = d.offsetTop - t.offsetTop;
                            if (P < HeaderMinimumDistanceFromArticleTop) {
                                    var H = innerTextOrTextContent(d),
                                            B = H.length * HeaderLevenshteinDistanceToLengthRatio;
                                    levenshteinDistance(g, H) <= B && (_ = m)
                            }
                    }
                    _ || this.isMediaWikiPage() && /editsection/.test(d.className) && (_ = m);
                    var j;
                    _ || (j = getComputedStyle(d));
                    if (!_ && D === "DIV" && m.parentNode) {
                            var F = d.querySelectorAll("a, blockquote, dl, div, img, ol, p, pre, table, ul"),
                                    I = l || j["float"] !== "none";
                            if (!I && !F.length) {
                                    var q = m.parentNode,
                                            R = this.contentDocument.createElement("p");
                                    while (m.firstChild) {
                                            var U = m.firstChild;
                                            R.appendChild(U)
                                    }
                                    q.replaceChild(R, m), w === m && (w = R), m = R, m.originalElement = d, D = m.tagName
                            }
                    }!_ && m.parentNode && D in s && a.push(m);
                    if (!_) {
                            if (E) {
                                    var z = j.display === "none" || j.visibility !== "visible" || computedStyleIndicatesElementIsInvisibleDueToClipping(j);
                                    if (z) {
                                            var W = C ? f === C.depth && selectorForElement(d) === C.selector : !1;
                                            !W && !M(d, t) && (_ = m)
                                    }
                            }
                            isElementPositionedOffScreen(d) ? _ = m : d !== t && !l && j["float"] !== "none" && !k && (cachedElementBoundingRect(d).height >= FloatMinimumHeight || d.childElementCount > 1) && (l = 1)
                    }
                    if (!_) {
                            var X = m.attributes;
                            for (var V = 0; V < X.length; ++V) {
                                    var $ = X[V].nodeName;
                                    AttributesToRemoveRegEx.test($) && (m.removeAttribute($), V--)
                            }
                            j.clear === "both" && m.classList.add("clear");
                            if ((D === "UL" || D === "OL") && j["list-style-type"] === "none" && j["background-image"] === "none") {
                                    var J = d.children,
                                            K = J.length,
                                            Q = !0;
                                    for (var V = 0; V < K; ++V) {
                                            var G = getComputedStyle(J[V]);
                                            if (G["list-style-type"] !== "none" || parseInt(G["-webkit-padding-start"]) !== 0) {
                                                    Q = !1;
                                                    break
                                            }
                                    }
                                    Q && m.classList.add("list-style-type-none")
                            }!h && j.fontStyle !== "normal" && (D in o || (m.style.fontStyle = j.fontStyle), h = 1), !p && j.fontWeight !== "normal" && (D in u || (m.style.fontWeight = j.fontWeight), p = 1);
                            if (l) {
                                    l === 1 && (cachedElementBoundingRect(d).width <= MaximumFloatWidth ? m.setAttribute("class", "auxiliary float " + j["float"]) : m.classList.add("auxiliary"));
                                    var Y = d.style.getPropertyValue("width");
                                    if (Y)
                                            m.style.width = Y;
                                    else {
                                            var Z = v.getMatchedCSSRules(d, "", !0);
                                            if (Z) {
                                                    var et = Z.length;
                                                    for (var V = et - 1; V >= 0; --V) {
                                                            Y = Z[V].style.getPropertyValue("width");
                                                            if (Y) {
                                                                    m.style.width = Y;
                                                                    break
                                                            }
                                                    }
                                            }
                                    }
                                    l === 1 && !Y && (m.style.width = cachedElementBoundingRect(d).width + "px");
                                    var tt = m.parentNode === n ? 36 : 12,
                                            nt = m.style.width;
                                    nt && parseInt(nt) >= screen.width - tt && m.setAttribute("class", "large-element")
                            }
                            if (D === "TABLE")
                                    c || (c = 1);
                            else if (D === "VIDEO") {
                                    var rt = cachedElementBoundingRect(d);
                                    const it = 36;
                                    rt.width > screen.width - it && m.setAttribute("class", "large-element")
                            } else if (D === "IMG") {
                                    var st = !1,
                                            ot = X.length;
                                    for (var V = 0; V < ot; ++V) {
                                            var $ = X[V].nodeName;
                                            if (KnownImageLazyLoadingAttributes[$.toLowerCase()]) {
                                                    m.setAttribute("src", m.getAttribute($)), st = !0;
                                                    break
                                            }
                                    }
                                    m.removeAttribute("border"), m.removeAttribute("hspace"), m.removeAttribute("vspace");
                                    var ut = m.getAttribute("align");
                                    m.removeAttribute("align");
                                    if (ut === "left" || ut === "right")
                                            m.classList.add("float"), m.classList.add(ut);
                                    if (!l && !st) {
                                            var at = cachedElementBoundingRect(d),
                                                    ft = at.width,
                                                    lt = at.height;
                                            ft === 1 && lt === 1 ? _ = m : O && lt < MinimumHeightForImagesAboveTheArticleTitle && at.bottom < O.top ? _ = m : ft < ImageSizeTiny && lt < ImageSizeTiny && m.setAttribute("class", "reader-image-tiny")
                                    }
                            } else if (D === "FONT")
                                    m.removeAttribute("size"), m.removeAttribute("face"), m.removeAttribute("color");
                            else if (D === "A" && m.parentNode) {
                                    var ct = m.getAttribute("href");
                                    if (ct && ct.length && (ct[0] === "#" || ct.substring(0, 11) === "javascript:")) {
                                            if (!c && !m.childElementCount && m.parentElement.childElementCount === 1 && m.parentElement.tagName !== "LI") {
                                                    var ht = this.contentDocument.evaluate("text()", m.parentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                                    ht.snapshotLength || (_ = m)
                                            }
                                            if (!_) {
                                                    var R = this.contentDocument.createElement("span");
                                                    if (m.childElementCount === 1 && m.firstElementChild.tagName === "IMG") {
                                                            var pt = m.firstElementChild;
                                                            pt.width > AnchorImageMinimumWidth && pt.height > AnchorImageMinimumHeight && R.setAttribute("class", "converted-image-anchor")
                                                    }
                                                    R.className || R.setAttribute("class", "converted-anchor");
                                                    while (m.firstChild)
                                                            R.appendChild(m.firstChild);
                                                    m.parentNode.replaceChild(R, m), m = R, w === m && (w = R)
                                            }
                                    }
                            }
                    }!_ && elementIsCommentBlock(d) && (_ = m);
                    if (!_ && D === "A" && L.has(d.href)) {
                            var dt = d,
                                    vt = m,
                                    mt, gt;
                            while ((dt = dt.parentElement) && (vt = vt.parentElement)) {
                                    const yt = 10;
                                    if (cachedElementBoundingRect(dt).top - cachedElementBoundingRect(d).top > yt)
                                            break;
                                    if (dt === t)
                                            break;
                                    N(dt) && (mt = dt, gt = vt)
                            }
                            mt && (_ = gt, d = mt, m = gt, m.originalElement = d, D = m.tagName), dt = null, vt = null, mt = null, gt = null
                    }
                    var bt = _ ? null : d.firstElementChild;
                    if (bt)
                            d = bt, m = m.firstElementChild, S(1);
                    else {
                            var wt;
                            while (d !== t && !(wt = d.nextElementSibling))
                                    d = d.parentElement, m = m.parentElement, S(-1);
                            if (d === t) {
                                    if (_)
                                            if (_.parentElement)
                                                    _.remove();
                                            else if (r)
                                            return null;
                                    break
                            }
                            d = wt, m = m.nextElementSibling, x()
                    }
                    if (_)
                            if (_.parentElement)
                                    _.remove();
                            else if (r)
                            return null
            }
            var Et = n.querySelectorAll("iframe"),
                    St = Et.length;
            for (var V = 0; V < St; ++V) {
                    var xt = Et[V];
                    if (elementLooksLikeEmbeddedTweet(xt.originalElement)) {
                            var Tt = this.adoptableSimpleTweetFromTwitterIframe(xt);
                            Tt && xt.parentElement.replaceChild(Tt, xt)
                    }
            }
            for (var V = a.length - 1; V >= 0; --V) {
                    var Nt = a[V];
                    Nt.parentNode && this.shouldPruneElement(Nt, Nt.originalElement) && (w === Nt && ((w = Nt.nextElementSibling) || (w = Nt.parentElement)), Nt.remove())
            }
            var Ct = n.querySelectorAll(".float");
            for (var V = 0; V < Ct.length; ++V) {
                    var kt = !1,
                            Lt = Ct[V];
                    if (!kt) {
                            var At = Lt.querySelectorAll("a, span.converted-image-anchor"),
                                    Ot = Lt.querySelectorAll("span.converted-anchor");
                            kt = Lt.parentNode && Ot.length > At.length
                    }
                    if (!kt) {
                            var Mt = Lt.querySelectorAll("embed, object").length,
                                    _t = Lt.originalElement.querySelectorAll("embed, object").length;
                            !Mt && _t && (kt = !0)
                    }
                    if (!kt) {
                            var Dt = Lt.originalElement.getElementsByTagName("img"),
                                    Pt = Dt.length,
                                    Ht = 0;
                            for (var Bt = 0; Bt < Pt; ++Bt) {
                                    E && isElementVisible(Dt[Bt]) && Ht++;
                                    if (Ht > 1)
                                            break
                            }
                            if (Ht === 1) {
                                    var jt = Lt.getElementsByTagName("img").length;
                                    jt || (kt = !0)
                            }
                    }
                    kt && (w === Lt && ((w = Lt.nextElementSibling) || (w = Lt.parentElement)), Lt.remove())
            }
            if (r && !removeWhitespace(n.innerText).length)
                    return null;
            if (w) {
                    var Ft = document.createElement("div"),
                            It = w.originalElement.getBoundingClientRect(),
                            qt = It.height > 0 ? It.top * 100 / It.height : 0;
                    Ft.style.position = "relative", Ft.style.top = Math.round(-qt) + "%", Ft.setAttribute("id", "safari-reader-element-marker"), w.insertBefore(Ft, w.firstChild)
            }
            return n
    },
    adoptableSimpleTweetFromTwitterIframe: function (t) {
            var n = t.originalElement.contentDocument.documentElement,
                    r = n.querySelector("[data-tweet-id].expanded");
            if (!r)
                    return null;
            var i = this.contentDocument.createElement("div");
            i.classList.add("tweet-wrapper");
            var s = this.contentDocument.createElement("blockquote");
            s.classList.add("simple-tweet"), i.appendChild(s);
            var o = r.getAttribute("data-tweet-id");
            i.setAttribute("data-reader-tweet-id", o);
            var u = r.querySelector(".dateline"),
                    a = r.querySelector('[data-scribe="element:screen_name"]'),
                    f = r.querySelector('[data-scribe="element:name"]'),
                    l = r.querySelector(".e-entry-title");
            if (!u || !a || !f || !l)
                    return i;
            var c = "&mdash; " + f.innerText + " (" + a.innerText + ")",
                    h = this.contentDocument.createElement("p");
            h.innerHTML = l.innerHTML, s.appendChild(h), s.insertAdjacentHTML("beforeend", c);
            var p = this.contentDocument.createElement("span");
            p.innerHTML = u.innerHTML, s.appendChild(p);
            var d = s.querySelectorAll("img.twitter-emoji"),
                    v = d.length;
            for (var m = 0; m < v; ++m) {
                    var g = d[m],
                            y = g.getAttribute("alt");
                    if (y && y.length > 0) {
                            var b = this.contentDocument.createElement("span");
                            b.innerText = y, g.parentNode.replaceChild(b, g)
                    }
            }
            return i
    },
    leadingImageNode: function () {
            const t = 250,
                    n = .5,
                    r = 3;
            if (!this.article || !this.article.element)
                    return null;
            var i = this.article.element;
            for (var s = 0; s < r; ++s) {
                    if (!i.parentNode)
                            break;
                    i = i.parentNode;
                    var o = i.getElementsByTagName("img")[0];
                    if (o) {
                            var u = cachedElementBoundingRect(o);
                            if (u.height >= t && u.width >= this._articleWidth * n) {
                                    var a = this.article.element.compareDocumentPosition(o);
                                    if (!(a & DocumentPositionPreceding) || a & DocumentPositionContainedBy)
                                            continue;
                                    a = this.extraArticle ? this.extraArticle.element.compareDocumentPosition(o) : null;
                                    if (a && (!(a & DocumentPositionPreceding) || a & DocumentPositionContainedBy))
                                            continue;
                                    return o
                            }
                    }
            }
            return null
    },
    mainImageNode: function () {
            var t = this.leadingImageNode();
            if (t)
                    return t;
            if (this.article && this.article.element) {
                    var n = this.article.element.querySelectorAll("img"),
                            r = n.length;
                    for (var i = 0; i < r; ++i) {
                            var s = n[i],
                                    o = s._cachedElementBoundingRect;
                            o || (o = s.getBoundingClientRect());
                            if (o.width >= MainImageMinimumWidthAndHeight && o.height >= MainImageMinimumWidthAndHeight)
                                    return s
                    }
            }
            return null
    },
    articleTitle: function () {
            function m(e, t) {
                    var n = e ? t.indexOf(e) : -1;
                    return n !== -1 && (n === 0 || n + e.length === t.length)
            }

            function g(e, t) {
                    return e.host === t.host && e.pathname === t.pathname
            }
            if (!this.articleNode())
                    return;
            if (this._articleTitle)
                    return this._articleTitle;
            const t = 500,
                    n = 20,
                    r = 8,
                    i = 1.1,
                    s = 1.25,
                    o = /header|title|headline|instapaper_title/i,
                    u = 1.5,
                    a = 1.8,
                    f = 1.5,
                    l = .6,
                    c = 3,
                    h = 1.5,
                    p = 9,
                    d = 1.5,
                    v = /byline|author/i;
            var y = function (e) {
                            var t = this.contentDocument.querySelector(e),
                                    n = t && t.attributes.length === 2 ? t.content : null;
                            if (n) {
                                    var r = this.articleTitleAndSiteNameFromTitleString(n);
                                    r && (n = r.articleTitle)
                            }
                            return n
                    }.bind(this),
                    b = this.contentDocument.title,
                    w = y("head meta[property='og:title']"),
                    E = y("head meta[name='twitter:title']"),
                    S = cachedElementBoundingRect(this.articleNode());
            this.extraArticleNode() && this.extraArticle.isPrepended && (S = cachedElementBoundingRect(this.extraArticleNode()));
            var x = S.left + S.width / 2,
                    T = S.top,
                    N = T;
            this._articleWidth = S.width, this.leadingImage = this.leadingImageNode();
            if (this.leadingImage) {
                    var C = cachedElementBoundingRect(this.leadingImage);
                    N = (C.top + T) / 2
            }
            var k = "h1, h2, h3, h4, h5, .headline, .article_title, #hn-headline, .inside-head, .instapaper_title",
                    L = this.article.element.tagName;
            if (L === "DL" || L === "DD")
                    k += ", dt";
            var A = this.contentDocument.querySelectorAll(k);
            A = Array.prototype.slice.call(A, 0);
            var O = this.contentDocument.location,
                    M = this.article.element.getElementsByTagName("a");
            for (var _ = 0; _ < M.length; _++) {
                    var D = M[_];
                    if (D.offsetTop > this.articleNode().offsetTop + n)
                            break;
                    if (g(D, O)) {
                            A.push(D);
                            break
                    }
            }
            var P, H = A.map(innerTextOrTextContent),
                    B = A.length,
                    j = 0,
                    F = [],
                    I = [],
                    q = [];
            for (var _ = 0; _ < B; ++_) {
                    var R = A[_],
                            U = H[_],
                            z = stringSimilarity(b, U);
                    if (w) {
                            var W = stringSimilarity(w, U);
                            z += W, W > StringSimilarityToDeclareStringsNearlyIdentical && I.push(R)
                    }
                    if (E) {
                            var X = stringSimilarity(E, U);
                            z += X, X > StringSimilarityToDeclareStringsNearlyIdentical && q.push(R)
                    }
                    z === j ? F.push(R) : z > j && (j = z, F = [R])
            }
            I.length === 1 ? (P = I[0], P.headerText = innerTextOrTextContent(P)) : q.length === 1 && (P = q[0], P.headerText = innerTextOrTextContent(P));
            if (!P)
                    for (var _ = 0; _ < B; ++_) {
                            var R = A[_];
                            if (!isElementVisible(R))
                                    continue;
                            var V = cachedElementBoundingRect(R),
                                    $ = V.left + V.width / 2,
                                    J = V.top + V.height / 2,
                                    K = $ - x,
                                    Q = J - N,
                                    G = I.indexOf(R) !== -1,
                                    Y = q.indexOf(R) !== -1,
                                    Z = R.classList.contains("instapaper_title"),
                                    et = R.getAttribute("itemprop") === "headline",
                                    tt = G || Y || Z || et,
                                    nt = Math.sqrt(K * K + Q * Q),
                                    rt = tt ? t : Math.max(t - nt, 0),
                                    U = H[_],
                                    it = R.getAttribute("property");
                            if (it) {
                                    var st = /dc.title/i.exec(it);
                                    if (st && st[0]) {
                                            var ot = this.contentDocument.querySelectorAll('*[property~="' + st[0] + '"]');
                                            if (ot.length === 1) {
                                                    P = R, P.headerText = U;
                                                    break
                                            }
                                    }
                            }
                            if (v.test(R.className))
                                    continue;
                            if (!tt) {
                                    if (nt > t)
                                            continue;
                                    if ($ < S.left || $ > S.right)
                                            continue
                            }
                            if (b && stringsAreNearlyIdentical(U, b))
                                    rt *= c;
                            else if (m(U, b))
                                    rt *= h;
                            else if (U.length < r)
                                    continue;
                            var ut = !1,
                                    at = nearestAncestorElementWithTagName(R, "A");
                            at || (at = R.querySelector("a"));
                            if (at) {
                                    var ft = at.host === O.host,
                                            lt = at.pathname === O.pathname;
                                    if (ft && lt)
                                            rt *= f;
                                    else {
                                            if (ft && nearestAncestorElementWithTagName(R, "LI"))
                                                    continue;
                                            rt *= l, ut = !0
                                    }
                            }
                            var ct = fontSizeFromComputedStyle(getComputedStyle(R));
                            ut || (rt *= ct / BaseFontSize), rt *= 1 + TitleCandidateDepthScoreMultiplier * elementDepth(R);
                            var ht = parseInt(this.contentTextStyle().fontSize);
                            parseInt(ct) > ht * i && (rt *= s);
                            if (o.test(R.className) || o.test(R.getAttribute("id")))
                                    rt *= u;
                            var pt = R.parentElement;
                            pt && (o.test(pt.className) || o.test(pt.getAttribute("id"))) && (rt *= u), F.indexOf(R) !== -1 && (rt *= a);
                            if (!P || rt > P.headerScore)
                                    P = R, P.headerScore = rt, P.headerText = U
                    }
            P && domDistance(P, this.articleNode(), p + 1) > p && parseInt(getComputedStyle(P).fontSize) < d * ht && (P = null);
            if (P) {
                    this._articleTitleElement = P;
                    var dt = P.headerText.trim();
                    w && m(w, dt) ? this._articleTitle = w : b && m(b, dt) ? this._articleTitle = b : this._articleTitle = dt
            }
            return this._articleTitle || (w && m(w, b) ? this._articleTitle = w : this._articleTitle = b), this._articleTitle
    },
    articleIsLTR: function () {
            if (!this._articleIsLTR) {
                    var t = getComputedStyle(this.article.element);
                    this._articleIsLTR = t ? t.direction === "ltr" : !0
            }
            return this._articleIsLTR
    },
    findSuggestedCandidate: function () {
            var t = this.suggestedRouteToArticle;
            if (!t || !t.length)
                    return null;
            var n, r;
            for (r = t.length - 1; r >= 0; --r)
                    if (t[r].id) {
                            n = this.contentDocument.getElementById(t[r].id);
                            if (n)
                                    break
                    }
            r++, n || (n = this.contentDocument);
            while (r < t.length) {
                    var i = t[r],
                            s = n.nodeType === Node.DOCUMENT_NODE ? n.documentElement : n.firstElementChild;
                    for (var o = 1; s && o < i.index; s = s.nextElementSibling)
                            this.shouldIgnoreInRouteComputation(s) || o++;
                    if (!s)
                            return null;
                    if (s.tagName !== i.tagName)
                            return null;
                    if (i.className && s.className !== i.className)
                            return null;
                    n = s, r++
            }
            return isElementVisible(n) ? new CandidateElement(n, this.contentDocument) : null
    },
    canRunReaderDetection: function () {
            var e = this.contentDocument.location.hostname,
                    t = this.contentDocument.location.pathname;
            for (var n in BlacklistedHostsAllowedPathRegexMap) {
                    var r = new RegExp(n.escapeForRegExp());
                    if (!r.test(e))
                            continue;
                    var i = BlacklistedHostsAllowedPathRegexMap[n];
                    return i instanceof RegExp ? i.test(t) : !1
            }
            return !0
    },
    findArticleBySearchingAllElements: function (t) {
            var n = this.findSuggestedCandidate(),
                    r = this.findCandidateElements();
            if (!r || !r.length)
                    return n;
            if (n && n.basicScore() >= ReaderMinimumScore)
                    return n;
            var i = this.highestScoringCandidateFromCandidates(r);
            for (var s = i.element; s !== this.contentDocument; s = s.parentNode)
                    if (s.tagName === "BLOCKQUOTE") {
                            var o = s.parentNode,
                                    u = r.length;
                            for (var a = 0; a < u; ++a) {
                                    var f = r[a];
                                    if (f.element === o) {
                                            i = f;
                                            break
                                    }
                            }
                            break
                    }
            if (n && i.finalScore() < ReaderMinimumScore)
                    return n;
            if (!t) {
                    if (i.shouldDisqualifyDueToScoreDensity())
                            return null;
                    if (i.shouldDisqualifyDueToHorizontalRuleDensity())
                            return null;
                    if (i.shouldDisqualifyDueToHeaderDensity())
                            return null;
                    if (i.shouldDisqualifyDueToSimilarElements(r))
                            return null
            }
            return i
    },
    findExtraArticle: function () {
            if (!this.article)
                    return null;
            for (var t = 0, n = this.article.element; t < 3 && n; ++t, n = n.parentNode) {
                    var r = this.findExtraArticleCandidateElements(n);
                    if (!r || !r.length)
                            continue;
                    var i = this.sortCandidateElementsInDescendingScoreOrder(r),
                            s;
                    for (var o = 0; o < i.length; o++) {
                            s = i[o];
                            if (!s || !s.basicScore())
                                    break;
                            if (s.shouldDisqualifyDueToScoreDensity())
                                    continue;
                            if (s.shouldDisqualifyDueToHorizontalRuleDensity())
                                    continue;
                            if (s.shouldDisqualifyDueToHeaderDensity())
                                    continue;
                            if (cachedElementBoundingRect(s.element).height < PrependedArticleCandidateMinimumHeight && cachedElementBoundingRect(this.article.element).width !== cachedElementBoundingRect(s.element).width)
                                    continue;
                            var u = contentTextStyleForNode(this.contentDocument, s.element);
                            if (!u)
                                    continue;
                            if (u.fontFamily !== this.contentTextStyle().fontFamily || u.fontSize !== this.contentTextStyle().fontSize)
                                    continue;
                            if (s)
                                    return s
                    }
            }
            return null
    },
    highestScoringCandidateFromCandidates: function (t) {
            var n = 0,
                    r = null,
                    i = t.length;
            for (var s = 0; s < i; ++s) {
                    var o = t[s],
                            u = o.basicScore();
                    u >= n && (n = u, r = o)
            }
            return r
    },
    sortCandidateElementsInDescendingScoreOrder: function (t) {
            function n(e, t) {
                    return e.basicScore() !== t.basicScore() ? t.basicScore() - e.basicScore() : t.depth() - e.depth()
            }
            return t.sort(n)
    },
    findCandidateElements: function () {
            const t = 1e3;
            var n = Date.now() + t,
                    r = this.contentDocument.getElementsByTagName("*"),
                    i = r.length,
                    s = [];
            for (var o = 0; o < i; ++o) {
                    var u = r[o];
                    if (CandidateTagNamesToIgnore[u.tagName])
                            continue;
                    var a = CandidateElement.candidateIfElementIsViable(u, this.contentDocument);
                    a && s.push(a);
                    if (Date.now() > n) {
                            s = [];
                            break
                    }
            }
            var f = s.length;
            for (var o = 0; o < f; ++o)
                    s[o].element.candidateElement = s[o];
            for (var o = 0; o < f; ++o) {
                    var l = s[o];
                    if (l.element.tagName !== "BLOCKQUOTE")
                            continue;
                    var c = l.element.parentElement.candidateElement;
                    if (!c)
                            continue;
                    c.addTextNodesFromCandidateElement(l)
            }
            for (var o = 0; o < f; ++o)
                    s[o].element.candidateElement = null;
            return s
    },
    findExtraArticleCandidateElements: function (t) {
            if (!this.article)
                    return [];
            t || (t = this.article.element);
            var n = "preceding-sibling::*/descendant-or-self::*",
                    r = this.contentDocument.evaluate(n, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                    i = r.snapshotLength,
                    s = [];
            for (var o = 0; o < i; ++o) {
                    var u = r.snapshotItem(o);
                    if (CandidateTagNamesToIgnore[u.tagName])
                            continue;
                    var a = CandidateElement.extraArticleCandidateIfElementIsViable(u, this.article, this.contentDocument, !0);
                    a && s.push(a)
            }
            n = "following-sibling::*/descendant-or-self::*", r = this.contentDocument.evaluate(n, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), i = r.snapshotLength;
            for (var o = 0; o < i; ++o) {
                    var u = r.snapshotItem(o);
                    if (CandidateTagNamesToIgnore[u.tagName])
                            continue;
                    var a = CandidateElement.extraArticleCandidateIfElementIsViable(u, this.article, this.contentDocument, !1);
                    a && s.push(a)
            }
            return s
    },
    isGeneratedBy: function (t) {
            var n = this.contentDocument.head ? this.contentDocument.head.querySelector("meta[name=generator]") : null;
            if (!n)
                    return !1;
            var r = n.content;
            return r ? t.test(r) : !1
    },
    isMediaWikiPage: function () {
            return this.isGeneratedBy(/^MediaWiki /)
    },
    isWordPressSite: function () {
            return this.isGeneratedBy(/^WordPress/)
    },
    nextPageURLString: function () {
            if (!this.article)
                    return null;
            if (this.isMediaWikiPage())
                    return null;
            var t, n = 0,
                    r = this.article.element;
            r.parentNode && getComputedStyle(r).display === "inline" && (r = r.parentNode);
            var i = r,
                    s = cachedElementBoundingRect(r).bottom + LinkMaxVerticalDistanceFromArticle;
            while (isElementNode(i) && cachedElementBoundingRect(i).bottom <= s)
                    i = i.parentNode;
            i !== r && (i === this.contentDocument || isElementNode(i)) && (r = i);
            var o = this.contentDocument.evaluate(LinkCandidateXPathQuery, r, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                    u = o.snapshotLength;
            if (this.pageNumber <= 2 && !this.prefixWithDateForNextPageURL) {
                    var a = this.contentDocument.location.pathname,
                            f = a.match(LinkDateRegex);
                    f && (f = f[0], this.prefixWithDateForNextPageURL = a.substring(0, a.indexOf(f) + f.length))
            }
            for (var l = 0; l < u; ++l) {
                    var c = o.snapshotItem(l),
                            h = this.scoreNextPageLinkCandidate(c);
                    h > n && (t = c, n = h)
            }
            return t ? t.href : null
    },
    scoreNextPageLinkCandidate: function (t) {
            function n(e, t, n, r) {
                    t.substring(0, e.length) === e && (t = t.substring(e.length), e = "");
                    var i = t.lastInteger();
                    if (isNaN(i))
                            return !1;
                    var s = e ? e.lastInteger() : NaN;
                    if (isNaN(s) || s >= MaximumExactIntegralValue)
                            s = r;
                    return i === s ? n.lastInteger() === s + 1 : i === s + 1
            }

            function r(e) {
                    var t = {},
                            n = e.substring(1).split("&"),
                            r = n.length;
                    for (var i = 0; i < r; ++i) {
                            var s = n[i],
                                    o = s.indexOf("=");
                            o === -1 ? t[s] = null : t[s.substring(0, o)] = s.substring(o + 1)
                    }
                    return t
            }
            var i = this.contentDocument.location;
            if (t.host !== i.host)
                    return 0;
            if (t.pathname === i.pathname && t.search === i.search)
                    return 0;
            if (t.toString().indexOf("#") !== -1)
                    return 0;
            if (anchorLinksToAttachment(t) || anchorLinksToTagOrCategoryPage(t))
                    return 0;
            if (!isElementVisible(t))
                    return 0;
            var s = cachedElementBoundingRect(t),
                    o = this._articleBoundingRect,
                    u = Math.max(0, Math.max(o.top - (s.top + s.height), s.top - (o.top + o.height)));
            if (s.top < o.top)
                    return 0;
            if (u > LinkMaxVerticalDistanceFromArticle)
                    return 0;
            var a = Math.max(0, Math.max(o.left - (s.left + s.width), s.left - (o.left + o.width)));
            if (a > 0)
                    return 0;
            var f = i.pathname,
                    l = t.pathname;
            if (this.prefixWithDateForNextPageURL) {
                    if (t.pathname.indexOf(this.prefixWithDateForNextPageURL) === -1)
                            return 0;
                    f = f.substring(this.prefixWithDateForNextPageURL.length), l = l.substring(this.prefixWithDateForNextPageURL.length)
            }
            var c = l.substring(1).split("/");
            c[c.length - 1] || c.pop();
            var h = c.length,
                    p = f.substring(1).split("/"),
                    d = !1;
            p[p.length - 1] || (d = !0, p.pop());
            var v = p.length;
            if (h < v)
                    return 0;
            var m = 0,
                    g = 0,
                    y = t.textContent;
            for (var b = 0; b < h; ++b) {
                    var w = c[b],
                            E = b < v ? p[b] : "";
                    if (E !== w) {
                            if (b < v - 2)
                                    return 0;
                            if (w.length >= E.length) {
                                    var S = 0;
                                    while (w[w.length - 1 - S] === E[E.length - 1 - S])
                                            S++;
                                    S && (w = w.substring(0, w.length - S), E = E.substring(0, E.length - S));
                                    var x = w.indexOf(E);
                                    x !== -1 && (w = w.substring(x))
                            }
                            n(E, w, y, this.pageNumber) ? g = Math.pow(LinkNextOrdinalValueBase, b - h + 1) : m++
                    }
                    if (m > 1)
                            return 0
            }
            var T = !1;
            if (t.search) {
                    linkParameters = r(t.search), referenceParameters = r(i.search);
                    for (var N in linkParameters) {
                            var C = linkParameters[N],
                                    k = N in referenceParameters ? referenceParameters[N] : null;
                            if (k !== C) {
                                    k === null && (k = ""), C === null && (C = "");
                                    if (C.length < k.length)
                                            m++;
                                    else if (n(k, C, y, this.pageNumber)) {
                                            if (LinkURLSearchParameterKeyMatchRegex.test(N)) {
                                                    if (f.toLowerCase() !== l.toLowerCase())
                                                            return 0;
                                                    if (this.isWordPressSite() && d)
                                                            return 0;
                                                    T = !0
                                            }
                                            if (LinkURLBadSearchParameterKeyMatchRegex.test(N)) {
                                                    m++;
                                                    continue
                                            }
                                            g = Math.max(g, 1 / LinkNextOrdinalValueBase)
                                    } else
                                            m++
                            }
                    }
            }
            if (!g)
                    return 0;
            if (LinkURLPageSlashNumberMatchRegex.test(t.href) || LinkURLSlashDigitEndMatchRegex.test(t.href))
                    T = !0;
            if (!T && h === v && stringSimilarity(f, l) < LinkMinimumURLSimilarityRatio)
                    return 0;
            if (LinkURLArchiveSlashDigitEndMatchRegex.test(t))
                    return 0;
            var L = LinkMatchWeight * (Math.pow(LinkMismatchValueBase, -m) + g) + LinkVerticalDistanceFromArticleWeight * u / LinkMaxVerticalDistanceFromArticle;
            T && (L += LinkURLSemanticMatchBonus), t.parentNode.tagName === "LI" && (L += LinkListItemBonus);
            var y = t.innerText;
            return LinkNextMatchRegEx.test(y) && (L += LinkNextMatchBonus), LinkPageMatchRegEx.test(y) && (L += LinkPageMatchBonus), LinkContinueMatchRegEx.test(y) && (L += LinkContinueMatchBonus), L
    },
    elementContainsEnoughTextOfSameStyle: function (t) {
            function o(e, t) {
                    function u(e) {
                            var t = e.children[0];
                            if (t) {
                                    var n = t.children,
                                            r = n.length;
                                    for (var i = 0; i < r; ++i)
                                            if (getComputedStyle(n[i]).float !== "none")
                                                    return !1
                            }
                            return !0
                    }

                    function a(e, i) {
                            if (e.nodeType === Node.TEXT_NODE) {
                                    /\S/.test(e.nodeValue) && r.push(e);
                                    return
                            }
                            if (e.nodeType !== Node.ELEMENT_NODE)
                                    return;
                            if (!isElementVisible(e))
                                    return;
                            if (t && ++n > t)
                                    return;
                            if (e._evaluatedForTextContent)
                                    return;
                            var f = e.tagName;
                            if (f === "IFRAME" || f === "FORM")
                                    return;
                            o[f] ? i-- : (f === "UL" || f === "OL") && u(e) && i--;
                            var l = i + 1;
                            if (l < s) {
                                    var c = e.childNodes,
                                            h = c.length;
                                    for (var p = 0; p < h; ++p)
                                            a(c[p], l)
                            }
                    }
                    var n = 0,
                            r = [],
                            o = {
                                    P: 1,
                                    STRONG: 1,
                                    B: 1,
                                    EM: 1,
                                    I: 1,
                                    SPAN: 1
                            };
                    return i && (o.CENTER = 1, o.FONT = 1), a(e, 0), r
            }
            const n = 110,
                    r = 1800;
            var i = t.tagName === "BODY",
                    s = i ? 2 : 3,
                    u = o(t, n),
                    a = r / scoreMultiplierForElementTagNameAndAttributes(t) / languageScoreMultiplierForTextNodes(u),
                    f = {},
                    l = u.length;
            for (var c = 0; c < l; ++c) {
                    var h = u[c],
                            p = h.length,
                            d = h.parentElement,
                            v = window.getComputedStyle(d),
                            m = v.fontFamily + "|" + v.fontSize,
                            g = Math.pow(p, TextNodeLengthPower);
                    if (f[m]) {
                            if ((f[m] += g) > a)
                                    break
                    } else
                            f[m] = g
            }
            for (var m in f)
                    if (f[m] > a)
                            return !0;
            return !1
    },
    pointsToUseForHitTesting: function () {
            const t = window.innerWidth,
                    n = t / 4,
                    r = t / 2,
                    i = 128,
                    s = 320;
            return [
                    [r, 800],
                    [r, 600],
                    [n, 800],
                    [r, 400],
                    [r - i, 1100],
                    [s, 700],
                    [3 * n, 800],
                    [t - s, 700],
                    [r - i, 1300]
            ]
    },
    clearVisualExaminationState: function () {
            var t = this._elementsEvaluatedForTextContent.length;
            for (var n = 0; n < t; ++n)
                    delete this._elementsEvaluatedForTextContent[n]._evaluatedForTextContent;
            this._elementsEvaluatedForTextContent = []
    },
    findArticleByVisualExamination: function () {
            this.clearVisualExaminationState();
            var t = this.pointsToUseForHitTesting(),
                    n = t.length;
            for (var r = 0; r < n; r++) {
                    var i = t[r][0],
                            s = t[r][1],
                            o = elementAtPoint(i, s);
                    for (var u = o; u; u = u.parentElement) {
                            if (u._evaluatedForTextContent)
                                    break;
                            if (VeryPositiveClassNameRegEx.test(u.className))
                                    return new CandidateElement(u, this.contentDocument);
                            if (CandidateTagNamesToIgnore[u.tagName])
                                    continue;
                            var a = u.offsetWidth,
                                    f = u.offsetHeight;
                            if (!a && !f) {
                                    var l = cachedElementBoundingRect(u);
                                    a = l.width, f = l.height
                            }
                            if (a < CandidateMinimumWidth || f < CandidateMinimumHeight || a * f < CandidateMinimumArea)
                                    continue;
                            var c = this.elementContainsEnoughTextOfSameStyle(u);
                            u._evaluatedForTextContent = !0, this._elementsEvaluatedForTextContent.push(u);
                            if (!c)
                                    continue;
                            if (CandidateElement.candidateElementAdjustedHeight(u) < CandidateMinimumHeight)
                                    continue;
                            var h = new CandidateElement(u, this.contentDocument);
                            if (h.shouldDisqualifyDueToSimilarElements())
                                    return null;
                            if (h.shouldDisqualifyDueToHorizontalRuleDensity())
                                    return null;
                            if (h.shouldDisqualifyDueToHeaderDensity())
                                    return null;
                            if (h.shouldDisqualifyForDeepLinking())
                                    continue;
                            return h
                    }
            }
            return null
    },
    articleTextContent: function () {
            return this._articleTextContent
    },
    pageDescription: function () {
            var t = this.contentDocument.querySelectorAll("head meta[name]"),
                    n = t.length;
            for (var r = 0; r < n; ++r) {
                    var i = t[r];
                    if (i.getAttribute("name").toLowerCase() === "description") {
                            var s = i.getAttribute("content");
                            if (s)
                                    return s.trim()
                    }
            }
            return null
    },
    articleTitleAndSiteNameFromTitleString: function (e) {
            const t = [" - ", " \u2013 ", " \u2014 ", ": ", " | ", " \u00bb "],
                    n = t.length,
                    r = .6;
            var i = this.contentDocument.location.host,
                    s = i.replace(/^(www|m)\./, ""),
                    o = s.replace(/\.(com|info|net|org|edu)$/, "").toLowerCase(),
                    u, a;
            for (var f = 0; f < n; ++f) {
                    var l = e.split(t[f]);
                    if (l.length !== 2)
                            continue;
                    var c = l[0].trim(),
                            h = l[1].trim(),
                            p = c.toLowerCase(),
                            d = h.toLowerCase(),
                            v = Math.max(stringSimilarity(p, s), stringSimilarity(p, o)),
                            m = Math.max(stringSimilarity(d, s), stringSimilarity(d, o)),
                            g = Math.max(v, m);
                    if (!a || g > a)
                            a = g, v > m ? u = {
                                    siteName: c,
                                    articleTitle: h
                            } : u = {
                                    siteName: h,
                                    articleTitle: c
                            }
            }
            return u && a >= r ? u : null
    },
    readingListItemInformation: function () {
            const t = 220,
                    n = 220;
            var r, i = this.pageDescription(),
                    s = !1;
            this.adoptableArticle() ? (r = this.articleTitle(), i = i || this.articleTextContent(), s = !0) : (r = this.contentDocument.title, this.contentDocument.body && (i = i || this.contentDocument.body.innerText));
            var o = "",
                    u = this.mainImageNode();
            return u && (o = u.src), r || (r = userVisibleURLString(this.contentDocument.location.href)), r = r.trim().substring(0, t), i || (i = ""), i = i.trim().substring(0, n).replace(/[\s]+/g, " "), {
                    title: r,
                    previewText: i,
                    mainImageURL: o,
                    isReaderAvailable: s
            }
    }
};
var ReaderArticleFinderJS = new ReaderArticleFinder(document);

var Mercury = function() {
"use strict";
function e() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
}
function t(e) {
    return e && e.__esModule ? e.default : e
}
function n(e, t) {
    return t = {
        exports: {}
    },
    e(t, t.exports),
    t.exports
}
function r() {
    throw new Error("setTimeout has not been defined")
}
function a() {
    throw new Error("clearTimeout has not been defined")
}
function i(e) {
    if ($t === setTimeout)
        return setTimeout(e, 0);
    if (($t === r || !$t) && setTimeout)
        return $t = setTimeout,
        setTimeout(e, 0);
    try {
        return $t(e, 0)
    } catch (t) {
        try {
            return $t.call(null, e, 0)
        } catch (t) {
            return $t.call(this, e, 0)
        }
    }
}
function o(e) {
    if (Vt === clearTimeout)
        return clearTimeout(e);
    if ((Vt === a || !Vt) && clearTimeout)
        return Vt = clearTimeout,
        clearTimeout(e);
    try {
        return Vt(e)
    } catch (t) {
        try {
            return Vt.call(null, e)
        } catch (t) {
            return Vt.call(this, e)
        }
    }
}
function s() {
    Jt && Kt && (Jt = !1,
    Kt.length ? Xt = Kt.concat(Xt) : Zt = -1,
    Xt.length && u())
}
function u() {
    if (!Jt) {
        var e = i(s);
        Jt = !0;
        for (var t = Xt.length; t; ) {
            for (Kt = Xt,
            Xt = []; ++Zt < t; )
                Kt && Kt[Zt].run();
            Zt = -1,
            t = Xt.length
        }
        Kt = null,
        Jt = !1,
        o(e)
    }
}
function c(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
    Xt.push(new l(e,t)),
    1 !== Xt.length || Jt || i(u)
}
function l(e, t) {
    this.fun = e,
    this.array = t
}
function f() {}
function d(e) {
    throw new Error("process.binding is not supported")
}
function h() {
    return "/"
}
function p(e) {
    throw new Error("process.chdir is not supported")
}
function m() {
    return 0
}
function g(e) {
    var t = .001 * vn.call(gn)
      , n = Math.floor(t)
      , r = Math.floor(t % 1 * 1e9);
    return e && (n -= e[0],
    r -= e[1],
    r < 0 && (n--,
    r += 1e9)),
    [n, r]
}
function v() {
    var e = new Date
      , t = e - yn;
    return t / 1e3
}
function y(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}
function b() {
    this.protocol = null,
    this.slashes = null,
    this.auth = null,
    this.host = null,
    this.port = null,
    this.hostname = null,
    this.hash = null,
    this.search = null,
    this.query = null,
    this.pathname = null,
    this.path = null,
    this.href = null
}
function _(e, t, n) {
    if (e && _s.isObject(e) && e instanceof b)
        return e;
    var r = new b;
    return r.parse(e, t, n),
    r
}
function w(e) {
    return _s.isString(e) && (e = _(e)),
    e instanceof b ? e.format() : b.prototype.format.call(e)
}
function A(e, t) {
    return _(e, !1, !0).resolve(t)
}
function x(e, t) {
    return e ? _(e, !1, !0).resolveObject(t) : t
}
function M(e) {
    return e.replace(Vs, " ").trim()
}
function k(e, t) {
    var n = t.find(function(t) {
        return t.test(e)
    });
    return n ? n.exec(e)[1] : null
}
function T(e) {
    var t = e.match(Ks);
    if (!t)
        return null;
    var n = parseInt(t[6], 10);
    return n < 100 ? n : null
}
function S(e) {
    return e.split("#")[0].replace(/\/$/, "")
}
function E(e, t, n) {
    var r = !0;
    return t < 2 && Zs.test(e) && e.length < 3 && (r = !0),
    0 === t && "index" === e.toLowerCase() && (r = !1),
    t < 2 && e.length < 3 && !n && (r = !1),
    r
}
function C(e, t) {
    var n = t || Bs.parse(e)
      , r = n.protocol
      , a = n.host
      , i = n.path
      , o = !1
      , s = i.split("/").reverse().reduce(function(e, t, n) {
        var r = t;
        if (r.includes(".")) {
            var a = r.split(".")
              , i = pu(a, 2)
              , s = i[0]
              , u = i[1];
            Js.test(u) && (r = s)
        }
        return Ks.test(r) && n < 2 && (r = r.replace(Ks, "")),
        0 === n && (o = Xs.test(r)),
        E(r, n, o) && e.push(r),
        e
    }, []);
    return r + "//" + a + s.reverse().join("/")
}
function O(e) {
    return mu.test(e)
}
function D(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
    return e.trim().split(/\s+/).slice(0, t).join(" ")
}
function j(e) {
    var t = eu;
    if (Qs.test(e)) {
        var n = Qs.exec(e)[1];
        $s.encodingExists(n) && (t = n)
    }
    return t
}
function P(e, t) {
    var n, r = W(e);
    return t && yu.test(r) ? z(e) : null !== (n = r.match(bu)) ? {
        method: n[1],
        url: n[2],
        version: {
            major: parseInt(n[3], 10),
            minor: parseInt(n[4], 10)
        },
        headers: z(e)
    } : null !== (n = r.match(_u)) ? {
        version: {
            major: parseInt(n[1], 10),
            minor: parseInt(n[2], 10)
        },
        statusCode: parseInt(n[3], 10),
        statusMessage: n[4],
        headers: z(e)
    } : z(e)
}
function z(e) {
    var t, n, r, a = {}, i = vu(e), o = i();
    for (yu.test(o) && (o = i()); o; )
        " " !== o[0] && "\t" !== o[0] ? (n && L(n, r, a),
        t = o.indexOf(":"),
        n = o.substr(0, t),
        r = o.substr(t + 1).trim(),
        o = i()) : (r += " " + o.trim(),
        o = i());
    return n && L(n, r, a),
    a
}
function N(e) {
    return e && e._header && (e = e._header),
    e && "function" == typeof e.toString ? e.toString().trim() : ""
}
function W(e) {
    return e.slice(0, e.indexOf("\r\n"))
}
function L(e, t, n) {
    switch (e = e.toLowerCase()) {
    case "set-cookie":
        void 0 !== n[e] ? n[e].push(t) : n[e] = [t];
        break;
    case "content-type":
    case "content-length":
    case "user-agent":
    case "referer":
    case "host":
    case "authorization":
    case "proxy-authorization":
    case "if-modified-since":
    case "if-unmodified-since":
    case "from":
    case "location":
    case "max-forwards":
    case "retry-after":
    case "etag":
    case "last-modified":
    case "server":
    case "age":
    case "expires":
        void 0 === n[e] && (n[e] = t);
        break;
    default:
        "string" == typeof n[e] ? n[e] += ", " + t : n[e] = t
    }
}
function R(e, t) {
    if ("function" != typeof t)
        throw new Error("Bad callback given: " + t);
    if (!e)
        throw new Error("No options given");
    var n = e.onResponse;
    if (e = "string" == typeof e ? {
        uri: e
    } : JSON.parse(JSON.stringify(e)),
    e.onResponse = n,
    e.verbose && (R.log = B()),
    e.url && (e.uri = e.url,
    delete e.url),
    !e.uri && "" !== e.uri)
        throw new Error("options.uri is a required argument");
    if ("string" != typeof e.uri)
        throw new Error("options.uri must be a string");
    for (var r = ["proxy", "_redirectsFollowed", "maxRedirects", "followRedirect"], a = 0; a < r.length; a++)
        if (e[r[a]])
            throw new Error("options." + r[a] + " is not supported");
    if (e.callback = t,
    e.method = e.method || "GET",
    e.headers = e.headers || {},
    e.body = e.body || null,
    e.timeout = e.timeout || R.DEFAULT_TIMEOUT,
    e.headers.host)
        throw new Error("Options.headers.host is not supported");
    e.json && (e.headers.accept = e.headers.accept || "application/json",
    "GET" !== e.method && (e.headers["content-type"] = "application/json"),
    "boolean" != typeof e.json ? e.body = JSON.stringify(e.json) : "string" != typeof e.body && (e.body = JSON.stringify(e.body)));
    var i = function(e) {
        var t = [];
        for (var n in e)
            e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
    };
    if (e.qs) {
        var o = "string" == typeof e.qs ? e.qs : i(e.qs);
        e.uri.indexOf("?") !== -1 ? e.uri = e.uri + "&" + o : e.uri = e.uri + "?" + o
    }
    var s = function(e) {
        var t = {};
        t.boundry = "-------------------------------" + Math.floor(1e9 * Math.random());
        var n = [];
        for (var r in e)
            e.hasOwnProperty(r) && n.push("--" + t.boundry + '\nContent-Disposition: form-data; name="' + r + '"\n\n' + e[r] + "\n");
        return n.push("--" + t.boundry + "--"),
        t.body = n.join(""),
        t.length = t.body.length,
        t.type = "multipart/form-data; boundary=" + t.boundry,
        t
    };
    if (e.form) {
        if ("string" == typeof e.form)
            throw "form name unsupported";
        if ("POST" === e.method) {
            var u = (e.encoding || "application/x-www-form-urlencoded").toLowerCase();
            switch (e.headers["content-type"] = u,
            u) {
            case "application/x-www-form-urlencoded":
                e.body = i(e.form).replace(/%20/g, "+");
                break;
            case "multipart/form-data":
                var c = s(e.form);
                e.body = c.body,
                e.headers["content-type"] = c.type;
                break;
            default:
                throw new Error("unsupported encoding:" + u)
            }
        }
    }
    return e.onResponse = e.onResponse || Y,
    e.onResponse === !0 && (e.onResponse = t,
    e.callback = Y),
    !e.headers.authorization && e.auth && (e.headers.authorization = "Basic " + I(e.auth.username + ":" + e.auth.password)),
    q(e)
}
function q(e) {
    function t() {
        s = !0;
        var t = new Error("ETIMEDOUT");
        return t.code = "ETIMEDOUT",
        t.duration = e.timeout,
        R.log.error("Timeout", {
            id: o._id,
            milliseconds: e.timeout
        }),
        e.callback(t, o)
    }
    function n(t) {
        if (s)
            return R.log.debug("Ignoring timed out state change", {
                state: o.readyState,
                id: o.id
            });
        if (R.log.debug("State change", {
            state: o.readyState,
            id: o.id,
            timed_out: s
        }),
        o.readyState === xu.OPENED) {
            R.log.debug("Request started", {
                id: o.id
            });
            for (var n in e.headers)
                o.setRequestHeader(n, e.headers[n])
        } else
            o.readyState === xu.HEADERS_RECEIVED ? r() : o.readyState === xu.LOADING ? (r(),
            a()) : o.readyState === xu.DONE && (r(),
            a(),
            i())
    }
    function r() {
        if (!f.response) {
            if (f.response = !0,
            R.log.debug("Got response", {
                id: o.id,
                status: o.status
            }),
            clearTimeout(o.timeoutTimer),
            o.statusCode = o.status,
            u && 0 == o.statusCode) {
                var t = new Error("CORS request rejected: " + e.uri);
                return t.cors = "rejected",
                f.loading = !0,
                f.end = !0,
                e.callback(t, o)
            }
            e.onResponse(null, o)
        }
    }
    function a() {
        f.loading || (f.loading = !0,
        R.log.debug("Response body loading", {
            id: o.id
        }))
    }
    function i() {
        if (!f.end) {
            if (f.end = !0,
            R.log.debug("Request done", {
                id: o.id
            }),
            o.body = o.responseText,
            o.headers = Au(o.getAllResponseHeaders()),
            e.json)
                try {
                    o.body = JSON.parse(o.responseText)
                } catch (t) {
                    return e.callback(t, o)
                }
            e.callback(null, o, o.body)
        }
    }
    var o = new xu
      , s = !1
      , u = F(e.uri)
      , c = "withCredentials"in o;
    if (ku += 1,
    o.seq_id = ku,
    o.id = ku + ": " + e.method + " " + e.uri,
    o._id = o.id,
    u && !c) {
        var l = new Error("Browser does not support cross-origin request: " + e.uri);
        return l.cors = "unsupported",
        e.callback(l, o)
    }
    o.timeoutTimer = setTimeout(t, e.timeout);
    var f = {
        response: !1,
        loading: !1,
        end: !1
    };
    return o.onreadystatechange = n,
    o.open(e.method, e.uri, !0),
    u && (o.withCredentials = !!e.withCredentials),
    o.send(e.body),
    o
}
function Y() {}
function B() {
    var e, t, n = {}, r = ["trace", "debug", "info", "warn", "error"];
    for (t = 0; t < r.length; t++)
        e = r[t],
        n[e] = Y,
        "undefined" != typeof console && console && console[e] && (n[e] = H(console, e));
    return n
}
function H(e, t) {
    function n(n, r) {
        return "object" == typeof r && (n += " " + JSON.stringify(r)),
        e[t].call(e, n)
    }
    return n
}
function F(e) {
    var t, n = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;
    try {
        t = location.href
    } catch (e) {
        t = document.createElement("a"),
        t.href = "",
        t = t.href
    }
    var r = n.exec(t.toLowerCase()) || []
      , a = n.exec(e.toLowerCase())
      , i = !(!a || a[1] == r[1] && a[2] == r[2] && (a[3] || ("http:" === a[1] ? 80 : 443)) == (r[3] || ("http:" === r[1] ? 80 : 443)));
    return i
}
function I(e) {
    var t, n, r, a, i, o, s, u, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = 0, f = 0, d = "", h = [];
    if (!e)
        return e;
    do
        t = e.charCodeAt(l++),
        n = e.charCodeAt(l++),
        r = e.charCodeAt(l++),
        u = t << 16 | n << 8 | r,
        a = u >> 18 & 63,
        i = u >> 12 & 63,
        o = u >> 6 & 63,
        s = 63 & u,
        h[f++] = c.charAt(a) + c.charAt(i) + c.charAt(o) + c.charAt(s);
    while (l < e.length);switch (d = h.join(""),
    e.length % 3) {
    case 1:
        d = d.slice(0, -2) + "==";
        break;
    case 2:
        d = d.slice(0, -1) + "="
    }
    return d
}
function U() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1
      , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return kn.wrap(function(n) {
        for (; ; )
            switch (n.prev = n.next) {
            case 0:
                if (!(e <= t)) {
                    n.next = 5;
                    break
                }
                return n.next = 3,
                e += 1;
            case 3:
                n.next = 0;
                break;
            case 5:
            case "end":
                return n.stop()
            }
    }, Eu[0], this)
}
function G(e) {
    var t = e.hostname;
    return !!t
}
function $(e) {
    return new ds(function(t, n) {
        Su(e, function(e, r, a) {
            e ? n(e) : t({
                body: a,
                response: r
            })
        })
    }
    )
}
function V(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (e.statusMessage && "OK" !== e.statusMessage || 200 !== e.statusCode) {
        if (!e.statusCode)
            throw new Error("Unable to fetch content. Original exception was " + e.error);
        if (!t)
            throw new Error("Resource returned a response status code of " + e.statusCode + " and resource was instructed to reject non-2xx level status codes.")
    }
    var n = e.headers
      , r = n["content-type"]
      , a = n["content-length"];
    if (Pu.test(r))
        throw new Error("Content-type for this resource was " + r + " and is not allowed.");
    if (a > zu)
        throw new Error("Content for this resource was too large. Maximum content length is " + zu + ".");
    return !0
}
function K(e, t, n) {
    return e("meta[" + t + "]").each(function(r, a) {
        var i = e(a)
          , o = i.attr(t);
        i.attr(n, o),
        i.removeAttr(t)
    }),
    e
}
function X(e) {
    return e = K(e, "content", "value"),
    e = K(e, "property", "name")
}
function J(e) {
    return e("*").not("a").each(function(t, n) {
        var r = e(n)
          , a = r.attr("class")
          , i = r.attr("id");
        if (i || a) {
            var o = (a || "") + " " + (i || "");
            _c.test(o) || yc.test(o) && r.remove()
        }
    }),
    e
}
function Z(e) {
    var t = !1;
    return e("br").each(function(n, r) {
        var a = e(r)
          , i = a.next().get(0);
        i && "br" === i.tagName.toLowerCase() ? (t = !0,
        a.remove()) : t && (t = !1,
        Q(r, e, !0))
    }),
    e
}
function Q(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
      , r = t(e);
    if (n) {
        for (var a = e.nextSibling, i = t("<p></p>"); a && (!a.tagName || !gc.test(a.tagName)); ) {
            var o = a.nextSibling;
            t(a).appendTo(i),
            a = o
        }
        return r.replaceWith(i),
        r.remove(),
        t
    }
    return t
}
function ee(e) {
    return e("div").each(function(t, n) {
        var r = e(n)
          , a = 0 === r.children(uc).length;
        a && re(r, e, "p")
    }),
    e
}
function te(e) {
    return e("span").each(function(t, n) {
        var r = e(n)
          , a = 0 === r.parents("p, div").length;
        a && re(r, e, "p")
    }),
    e
}
function ne(e) {
    return e = Z(e),
    e = ee(e),
    e = te(e)
}
function re(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "p"
      , r = e.get(0);
    if (!r)
        return t;
    var a = Ie(r) || {}
      , i = Vu(a).map(function(e) {
        return e + "=" + a[e]
    }).join(" ")
      , o = void 0;
    return o = t.browser ? "noscript" === r.tagName.toLowerCase() ? e.text() : e.html() : e.contents(),
    e.replaceWith("<" + n + " " + i + ">" + o + "</" + n + ">"),
    t
}
function ae(e, t) {
    var n = parseInt(e.attr("height"), 10)
      , r = parseInt(e.attr("width"), 10) || 20;
    return (n || 20) < 10 || r < 10 ? e.remove() : n && e.removeAttr("height"),
    t
}
function ie(e, t) {
    return Ku.test(e.attr("src")) && e.remove(),
    t
}
function oe(e, t) {
    return e.find("img").each(function(e, n) {
        var r = t(n);
        ae(r, t),
        ie(r, t)
    }),
    t
}
function se(e, t, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
    if (0 === r.length && (r = Ju),
    n) {
        var a = Bs.parse(n)
          , i = a.protocol
          , o = a.hostname;
        r = [].concat(Wc(r), ['iframe[src^="' + i + "//" + o + '"]'])
    }
    return t(r.join(","), e).addClass(Xu),
    t
}
function ue(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
    return 0 === n.length && (n = Zu),
    t(n.join(","), e).not("." + Xu).remove(),
    t("." + Xu, e).removeClass(Xu),
    t
}
function ce(e, t) {
    var n = t("h1", e);
    return n.length < 3 ? n.each(function(e, n) {
        return t(n).remove()
    }) : n.each(function(e, n) {
        re(t(n), t, "h2")
    }),
    t
}
function le(e) {
    return e.find("*").each(function(e, t) {
        var n = Ie(t);
        Ge(t, Vu(n).reduce(function(e, t) {
            return tc.test(t) ? da({}, e, Hc({}, t, n[t])) : e
        }, {}))
    }),
    e
}
function fe(e) {
    return le(e.parent().length ? e.parent() : e)
}
function de(e, t) {
    return e.find("p").each(function(e, n) {
        var r = t(n);
        0 === r.find("iframe, img").length && "" === r.text().trim() && r.remove()
    }),
    t
}
function he(e) {
    var t = e.attr("class")
      , n = e.attr("id")
      , r = 0;
    return n && (Jc.test(n) && (r += 25),
    el.test(n) && (r -= 25)),
    t && (0 === r && (Jc.test(t) && (r += 25),
    el.test(t) && (r -= 25)),
    Kc.test(t) && (r += 10),
    Zc.test(t) && (r += 25)),
    r
}
function pe(e) {
    return parseFloat(e.attr("score")) || null
}
function me(e) {
    return (e.match(/,/g) || []).length
}
function ge(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "p"
      , n = e / 50;
    if (n > 0) {
        var r = void 0;
        return r = al.test(t) ? n - 2 : n - 1.25,
        Math.min(Math.max(r, 0), 3)
    }
    return 0
}
function ve(e) {
    var t = 1
      , n = e.text().trim()
      , r = n.length;
    return r < 25 ? 0 : (t += me(n),
    t += ge(r),
    ":" === n.slice(-1) && (t -= 1),
    t)
}
function ye(e, t, n) {
    return e.attr("score", n),
    e
}
function be(e, t, n) {
    try {
        var r = we(e, t) + n;
        ye(e, t, r)
    } catch (e) {}
    return e
}
function _e(e, t, n) {
    var r = e.parent();
    return r && be(r, t, .25 * n),
    e
}
function we(e, t) {
    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
      , r = pe(e);
    return r ? r : (r = Ae(e),
    n && (r += he(e)),
    _e(e, t, r),
    r)
}
function Ae(e) {
    var t = e.get(0)
      , n = t.tagName;
    return tl.test(n) ? ve(e) : "div" === n.toLowerCase() ? 5 : nl.test(n) ? 3 : rl.test(n) ? -3 : "th" === n.toLowerCase() ? -5 : 0
}
function xe(e, t) {
    if (e.get(0)) {
        var n = e.get(0)
          , r = n.tagName;
        "span" === r && re(e, t, "div")
    }
}
function Me(e, t, n) {
    e && (xe(e, t),
    be(e, t, n))
}
function ke(e, t) {
    return e("p, pre").not("[score]").each(function(n, r) {
        var a = e(r);
        a = ye(a, e, we(a, e, t));
        var i = a.parent()
          , o = Ae(a);
        Me(i, e, o, t),
        i && Me(i.parent(), e, o / 2, t)
    }),
    e
}
function Te(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return $c.forEach(function(t) {
        var n = pu(t, 2)
          , r = n[0]
          , a = n[1];
        e(r + " " + a).each(function(t, n) {
            be(e(n).parent(r), e, 80)
        })
    }),
    ke(e, t),
    ke(e, t),
    e
}
function Se(e, t, n) {
    if (!e.parent().length)
        return e;
    var r = Math.max(10, .25 * t)
      , a = n("<div></div>");
    return e.parent().children().each(function(i, o) {
        var s = n(o);
        if (Gc.test(o.tagName))
            return null;
        var u = pe(s);
        if (u)
            if (s.get(0) === e.get(0))
                a.append(s);
            else {
                var c = 0
                  , l = We(s);
                l < .05 && (c += 20),
                l >= .5 && (c -= 20),
                s.attr("class") === e.attr("class") && (c += .2 * t);
                var f = u + c;
                if (f >= r)
                    return a.append(s);
                if ("p" === o.tagName) {
                    var d = s.text()
                      , h = Ne(d);
                    if (h > 80 && l < .25)
                        return a.append(s);
                    if (h <= 80 && 0 === l && O(d))
                        return a.append(s)
                }
            }
        return null
    }),
    1 === a.children().length && a.children().first().get(0) === e.get(0) ? e : a
}
function Ee(e) {
    var t = void 0
      , n = 0;
    return e("[score]").each(function(r, a) {
        if (!Gc.test(a.tagName)) {
            var i = e(a)
              , o = pe(i);
            o > n && (n = o,
            t = i)
        }
    }),
    t ? t = Se(t, n, e) : e("body") || e("*").first()
}
function Ce(e, t, n) {
    if (!e.hasClass("entry-content-asset")) {
        var r = M(e.text());
        if (me(r) < 10) {
            var a = t("p", e).length
              , i = t("input", e).length;
            if (i > a / 3)
                return void e.remove();
            var o = r.length
              , s = t("img", e).length;
            if (o < 25 && 0 === s)
                return void e.remove();
            var u = We(e);
            if (n < 25 && u > .2 && o > 75)
                return void e.remove();
            if (n >= 25 && u > .5) {
                var c = e.get(0).tagName.toLowerCase()
                  , l = "ol" === c || "ul" === c;
                if (l) {
                    var f = e.prev();
                    if (f && ":" === M(f.text()).slice(-1))
                        return
                }
                return void e.remove()
            }
            var d = t("script", e).length;
            if (d > 0 && o < 150)
                return void e.remove()
        }
    }
}
function Oe(e, t) {
    return t(rc, e).each(function(e, n) {
        var r = t(n)
          , a = pe(r);
        a || (a = we(r, t),
        ye(r, t, a)),
        a < 0 ? r.remove() : Ce(r, t, a)
    }),
    t
}
function De(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return t(ic, e).each(function(r, a) {
        var i = t(a);
        return 0 === t(i, e).prevAll("p").length ? i.remove() : M(t(a).text()) === n ? i.remove() : he(t(a)) < 0 ? i.remove() : i
    }),
    t
}
function je(e, t) {
    return t = re(t("html"), t, "div"),
    t = re(t("body"), t, "div")
}
function Pe(e, t, n, r) {
    e("[" + n + "]", r).each(function(e, r) {
        var a = Ie(r)
          , i = a[n];
        if (i) {
            var o = Bs.resolve(t, i);
            Ue(r, n, o)
        }
    })
}
function ze(e, t, n) {
    return ["href", "src"].forEach(function(r) {
        return Pe(t, n, r, e)
    }),
    e
}
function Ne(e) {
    return e.trim().replace(/\s+/g, " ").length
}
function We(e) {
    var t = Ne(e.text())
      , n = e.find("a").text()
      , r = Ne(n);
    return t > 0 ? r / t : 0 === t && r > 0 ? 1 : 0
}
function Le(e, t, n) {
    var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
      , a = t.filter(function(e) {
        return n.indexOf(e) !== -1
    })
      , i = !0
      , o = !1
      , s = void 0;
    try {
        for (var u, c = function() {
            var t = u.value
              , n = "name"
              , a = "value"
              , i = e("meta[" + n + '="' + t + '"]')
              , o = i.map(function(t, n) {
                return e(n).attr(a)
            }).toArray().filter(function(e) {
                return "" !== e
            });
            if (1 === o.length) {
                var s = void 0;
                return s = r ? Ye(o[0], e) : o[0],
                {
                    v: s
                }
            }
        }, l = du(a); !(i = (u = l.next()).done); i = !0) {
            var f = c();
            if ("object" === ("undefined" == typeof f ? "undefined" : Uf(f)))
                return f.v
        }
    } catch (e) {
        o = !0,
        s = e
    } finally {
        try {
            !i && l.return && l.return()
        } finally {
            if (o)
                throw s
        }
    }
    return null
}
function Re(e, t) {
    return !(e.children().length > t) && !Be(e)
}
function qe(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
      , r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
      , a = !0
      , i = !1
      , o = void 0;
    try {
        for (var s, u = du(t); !(a = (s = u.next()).done); a = !0) {
            var c = s.value
              , l = e(c);
            if (1 === l.length) {
                var f = e(l[0]);
                if (Re(f, n)) {
                    var d = void 0;
                    if (d = r ? f.text() : f.html())
                        return d
                }
            }
        }
    } catch (e) {
        i = !0,
        o = e
    } finally {
        try {
            !a && u.return && u.return()
        } finally {
            if (i)
                throw o
        }
    }
    return null
}
function Ye(e, t) {
    var n = t("<span>" + e + "</span>").text();
    return "" === n ? e : n
}
function Be(e) {
    var t = e.parents().toArray()
      , n = t.find(function(e) {
        var t = Ie(e)
          , n = t.class
          , r = t.id
          , a = n + " " + r;
        return a.includes("comment")
    });
    return void 0 !== n
}
function He(e) {
    return e.text().trim().length >= 100
}
function Fe(e) {
    return e(hc).length > 0
}
function Ie(e) {
    var t = e.attribs
      , n = e.attributes;
    if (!t && n) {
        var r = Vu(n).reduce(function(e, t) {
            var r = n[t];
            return r.name && r.value ? (e[r.name] = r.value,
            e) : e
        }, {});
        return r
    }
    return t
}
function Ue(e, t, n) {
    return e.attribs ? e.attribs[t] = n : e.attributes && e.setAttribute(t, n),
    e
}
function Ge(e, t) {
    if (e.attribs)
        e.attribs = t;
    else if (e.attributes) {
        for (; e.attributes.length > 0; )
            e.removeAttribute(e.attributes[0].name);
        Vu(t).forEach(function(n) {
            e.setAttribute(n, t[n])
        })
    }
    return e
}
function $e(e) {
    return e("img").each(function(t, n) {
        var r = Ie(n);
        Vu(r).forEach(function(t) {
            var a = r[t];
            "src" !== t && Gf.test(a) && $f.test(a) && e(n).attr("src", a)
        })
    }),
    e
}
function Ve(e, t) {
    return "comment" === t.type
}
function Ke(e) {
    return e.root().find("*").contents().filter(Ve).remove(),
    e
}
function Xe(e) {
    return e(Vf).remove(),
    e = Ke(e)
}
function Je(e) {
    return e.supportedDomains ? id(e, [e.domain].concat(Wc(e.supportedDomains))) : id(e, [e.domain])
}
function Ze(e) {
    return M(e.replace(Gh, "$2").trim())
}
function Qe(e) {
    return e = e.trim(),
    up.isWebUri(e) ? e : null
}
function et(e, t) {
    var n = t.$
      , r = t.excerpt;
    if (e.length > 1e3 || e.length < 5)
        return null;
    if (r && D(r, 10) === D(e, 10))
        return null;
    var a = Ye(e, n);
    return $h.test(a) ? null : M(a.trim())
}
function tt(e, t) {
    var n = e;
    if (t = t || {},
    t.preferredOrder = t.preferredOrder || cm,
    n = n.replace(sm, "x"),
    n = n.replace(um, "X"),
    n = n.replace(om, "[$1]"),
    n = n.replace(wp, "dddd"),
    n = n.replace(Ap, "ddd"),
    n = n.replace(xp, "dd"),
    n = n.replace(Tp, "Do"),
    n = n.replace(Mp, "MMMM"),
    n = n.replace(kp, "MMM"),
    n = n.replace(Sp, nt.bind(null, t)),
    n = n.replace(Ep, "Z"),
    n = n.replace(qp, "HH:mm:ss.SSS"),
    n = n.replace(Yp, "HH:mm:ss.SS"),
    n = n.replace(Bp, "HH:mm:ss.S"),
    n = n.replace(Pp, "hh:mm:ss$1"),
    n = n.replace(Wp, "h:mm:ss$1"),
    n = n.replace(zp, "hh:mm$1"),
    n = n.replace(Lp, "h:mm$1"),
    n = n.replace(Np, "hh$1"),
    n = n.replace(Rp, "h$1"),
    n = n.replace(Hp, "HH:mm:ss"),
    n = n.replace(Up, "H:mm:ss.SSS"),
    n = n.replace(Gp, "H:mm:ss.SS"),
    n = n.replace($p, "H:mm:ss.S"),
    n = n.replace(Ip, "H:mm:ss"),
    n = n.replace(Fp, "HH:mm"),
    n = n.replace(Vp, "H:mm"),
    jp.test(e) ? n += "A" : Dp.test(e) && (n += "a"),
    n = n.replace(Kp, "YYYY"),
    n = n.replace(Qp, "D/M"),
    n = n.replace(em, "D/MM"),
    n = n.replace(tm, "DD/M"),
    n = n.replace(nm, "DD/MM"),
    n = n.replace(rm, "M/YY"),
    n = n.replace(am, "MM/YY"),
    n.match(im)) {
        var r = /0\d.\d{2}|\d{2}.\d{2}/
          , a = /\d{1}.\d{2}/;
        n = n.replace(r, "H.mm"),
        n = n.replace(a, "h.mm")
    }
    return n = n.replace(Xp, "DD"),
    n = n.replace(Jp, "D"),
    n = n.replace(Zp, "YY"),
    n.length < 1 && (n = void 0),
    n
}
function nt(e, t, n, r, a, i) {
    var o, s = 1 === Math.min(n.length, a.length, i.length), u = 4 === Math.max(n.length, a.length, i.length), c = "string" == typeof e.preferredOrder ? e.preferredOrder : e.preferredOrder[r];
    return n = parseInt(n, 10),
    a = parseInt(a, 10),
    i = parseInt(i, 10),
    o = [n, a, i],
    c = c.toUpperCase(),
    n > 31 ? (o[0] = u ? "YYYY" : "YY",
    o[1] = s ? "M" : "MM",
    o[2] = s ? "D" : "DD",
    o.join(r)) : a > 12 ? (o[0] = s ? "M" : "MM",
    o[1] = s ? "D" : "DD",
    o[2] = u ? "YYYY" : "YY",
    o.join(r)) : i > 31 ? (o[2] = u ? "YYYY" : "YY",
    "M" === c[0] && n < 13 ? (o[0] = s ? "M" : "MM",
    o[1] = s ? "D" : "DD",
    o.join(r)) : (o[0] = s ? "D" : "DD",
    o[1] = s ? "M" : "MM",
    o.join(r))) : (o[c.indexOf("D")] = s ? "D" : "DD",
    o[c.indexOf("M")] = s ? "M" : "MM",
    o[c.indexOf("Y")] = u ? "YYYY" : "YY",
    o.join(r))
}
function rt(e) {
    return (e.match(ap) || []).join(" ").replace(Zh, "m").replace(Jh, "$1 $2 $3").replace(Xh, "$1").trim()
}
function at(e, t, n) {
    return ip.test(e) ? lp(new Date(e)) : t ? lp.tz(e, n || fm(e), t) : lp(e, n || fm(e))
}
function it(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      , n = t.timezone
      , r = t.format;
    if (Vh.test(e) || Kh.test(e))
        return new Date(parseInt(e, 10)).toISOString();
    var a = at(e, n, r);
    return a.isValid() || (e = rt(e),
    a = at(e, n, r)),
    a.isValid() ? a.toISOString() : null
}
function ot(e, t) {
    var n = t.$
      , r = t.cleanConditionally
      , a = void 0 === r || r
      , i = t.title
      , o = void 0 === i ? "" : i
      , s = t.url
      , u = void 0 === s ? "" : s
      , c = t.defaultCleaner
      , l = void 0 === c || c;
    return je(e, n),
    l && oe(e, n),
    se(e, n, u),
    ue(e, n),
    ce(e, n),
    De(e, n, o),
    ze(e, n, u),
    l && Oe(e, n, a),
    de(e, n),
    fe(e, n),
    e
}
function st(e, t) {
    var n = t.url
      , r = t.$;
    if (op.test(e) && (e = dt(e, n)),
    e.length > 150) {
        var a = r("h1");
        1 === a.length && (e = a.text())
    }
    return M(Ye(e, r).trim())
}
function ut(e) {
    return e.reduce(function(e, t, n, r) {
        return e + t
    })
}
function ct(e) {
    if (Array.isArray(e))
        return e;
    if ("string" == typeof e)
        return e.split("");
    throw Error("Parameter must be a string or array.")
}
function lt(e, t) {
    if (e.length >= 6) {
        var n = function() {
            var n = e.reduce(function(e, t) {
                return e[t] = e[t] ? e[t] + 1 : 1,
                e
            }, {})
              , r = Vu(n).reduce(function(e, t) {
                return e[1] < n[t] ? [t, n[t]] : e
            }, [0, 0])
              , a = pu(r, 2)
              , i = a[0]
              , o = a[1];
            o >= 2 && i.length <= 4 && (e = t.split(i));
            var s = [e[0], e.slice(-1)]
              , u = s.reduce(function(e, t) {
                return e.length > t.length ? e : t
            }, "");
            return u.length > 10 ? {
                v: u
            } : {
                v: t
            }
        }();
        if ("object" === ("undefined" == typeof n ? "undefined" : Uf(n)))
            return n.v
    }
    return null
}
function ft(e, t) {
    var n = Bs.parse(t)
      , r = n.host
      , a = r.replace(sp, "")
      , i = e[0].toLowerCase().replace(" ", "")
      , o = _m.levenshtein(i, a);
    if (o > .4 && i.length > 5)
        return e.slice(2).join("");
    var s = e.slice(-1)[0].toLowerCase().replace(" ", "")
      , u = _m.levenshtein(s, a);
    return u > .4 && s.length >= 5 ? e.slice(0, -2).join("") : null
}
function dt(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
      , n = e.split(op);
    if (1 === n.length)
        return e;
    var r = lt(n, e);
    return r ? r : (r = ft(n, t),
    r ? r : e)
}
function ht(e, t) {
    t.stripUnlikelyCandidates && (e = J(e)),
    e = ne(e),
    e = Te(e, t.weightNodes);
    var n = Ee(e);
    return n
}
function pt(e) {
    return (e.attr("class") || "") + " " + (e.attr("id") || "")
}
function mt(e) {
    e = e.trim();
    var t = 0;
    return Fm.test(e) && (t += 20),
    Um.test(e) && (t -= 20),
    Gm.test(e) && (t -= 10),
    $m.test(e) && (t += 10),
    t
}
function gt(e) {
    return e.attr("alt") ? 5 : 0
}
function vt(e) {
    var t = 0
      , n = e.parents("figure").first();
    1 === n.length && (t += 25);
    var r = e.parent()
      , a = void 0;
    return 1 === r.length && (a = r.parent()),
    [r, a].forEach(function(e) {
        Kc.test(pt(e)) && (t += 15)
    }),
    t
}
function yt(e) {
    var t = 0
      , n = e.next()
      , r = n.get(0);
    return r && "figcaption" === r.tagName.toLowerCase() && (t += 25),
    Kc.test(pt(n)) && (t += 15),
    t
}
function bt(e) {
    var t = 0
      , n = parseFloat(e.attr("width"))
      , r = parseFloat(e.attr("height"))
      , a = e.attr("src");
    if (n && n <= 50 && (t -= 50),
    r && r <= 50 && (t -= 50),
    n && r && !a.includes("sprite")) {
        var i = n * r;
        i < 5e3 ? t -= 100 : t += Math.round(i / 1e3)
    }
    return t
}
function _t(e, t) {
    return e.length / 2 - t
}
function wt(e, t, n) {
    if (e > 0) {
        var r = new Zm.SequenceMatcher(null,t,n).ratio()
          , a = 1 - r
          , i = -(250 * (a - .2));
        return e + i
    }
    return 0
}
function At(e, t) {
    var n = 0;
    if (Zs.test(e.trim())) {
        var r = parseInt(e, 10);
        n = r < 2 ? -30 : Math.max(0, 10 - r),
        t && t >= r && (n -= 50)
    }
    return n
}
function xt(e, t) {
    return e && !t ? 50 : 0
}
function Mt(e) {
    return tg.test(e) ? -25 : 0
}
function kt(e) {
    return (e.attr("class") || "") + " " + (e.attr("id") || "")
}
function Tt(e) {
    var t = e.parent()
      , n = !1
      , r = !1
      , a = 0;
    return zc(U(0, 4)).forEach(function() {
        if (0 !== t.length) {
            var e = kt(t, " ");
            !n && pc.test(e) && (n = !0,
            a += 25),
            !r && dc.test(e) && tg.test(e) && (lc.test(e) || (r = !0,
            a -= 25)),
            t = t.parent()
        }
    }),
    a
}
function St(e) {
    return ag.test(e) ? -200 : 0
}
function Et(e, t, n, r, a, i) {
    if (void 0 !== i.find(function(t) {
        return e === t
    }))
        return !1;
    if (!e || e === t || e === n)
        return !1;
    var o = r.hostname
      , s = Bs.parse(e)
      , u = s.hostname;
    if (u !== o)
        return !1;
    var c = e.replace(n, "");
    return !!Qm.test(c) && (!tg.test(a) && !(a.length > 25))
}
function Ct(e, t) {
    return t.test(e) ? 0 : -25
}
function Ot(e) {
    return ng.test(e) ? 50 : 0
}
function Dt(e) {
    return rg.test(e) && ng.test(e) ? -65 : 0
}
function jt(e) {
    return new RegExp("^" + e,"i")
}
function Pt(e, t) {
    return (t || e.text()) + " " + (e.attr("class") || "") + " " + (e.attr("id") || "")
}
function zt(e) {
    var t = e.links
      , n = e.articleUrl
      , r = e.baseUrl
      , a = e.parsedUrl
      , i = e.$
      , o = e.previousUrls
      , s = void 0 === o ? [] : o;
    a = a || Bs.parse(n);
    var u = jt(r)
      , c = Fe(i)
      , l = t.reduce(function(e, t) {
        var o = Ie(t);
        if (!o.href)
            return e;
        var l = S(o.href)
          , f = i(t)
          , d = f.text();
        if (!Et(l, n, r, a, d, s))
            return e;
        e[l] ? e[l].linkText = e[l].linkText + "|" + d : e[l] = {
            score: 0,
            linkText: d,
            href: l
        };
        var h = e[l]
          , p = Pt(f, d)
          , m = T(l)
          , g = Ct(l, u);
        return g += Ot(p),
        g += Dt(p),
        g += St(p),
        g += Tt(f),
        g += Mt(l),
        g += xt(m, c),
        g += At(d, m),
        g += wt(g, n, l),
        h.score = g,
        e
    }, {});
    return 0 === Vu(l).length ? null : l
}
function Nt(e) {
    var t = Bs.parse(e)
      , n = t.hostname;
    return n
}
function Wt(e) {
    return {
        url: e,
        domain: Nt(e)
    }
}
function Lt(e, t, n, r, a) {
    var i = 0
      , o = "";
    if (e.length < t)
        return e;
    for (var s = 0, u = e.length; s < u; s++)
        if (o = e.charAt(s),
        r.indexOf(o) !== -1 && (i = s),
        !(s < t))
            return 0 === i ? a ? e.substring(0, t - 1) + n : "" : e.substring(0, i) + n;
    return e
}
function Rt(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
    return e = e.replace(/[\s\n]+/g, " ").trim(),
    cg(e, n, {
        ellipse: "&hellip;"
    })
}
function qt(e) {
    var t = Vu(pg).find(function(t) {
        return e(t).length > 0
    });
    return pg[t]
}
function Yt(e, t, n) {
    t = t || Bs.parse(e);
    var r = t
      , a = r.hostname
      , i = a.split(".").slice(-2).join(".");
    return Ih[a] || Ih[i] || qt(n) || hg
}
function Bt(e, t, n) {
    var r = n.clean;
    return r ? (t(r.join(","), e).remove(),
    e) : e
}
function Ht(e, t, n) {
    var r = n.transforms;
    return r ? (Vu(r).forEach(function(n) {
        var a = t(n, e)
          , i = r[n];
        "string" == typeof i ? a.each(function(e, a) {
            re(t(a), t, r[n])
        }) : "function" == typeof i && a.each(function(e, n) {
            var r = i(t(n), t);
            "string" == typeof r && re(t(n), t, r)
        })
    }),
    e) : e
}
function Ft(e, t, n) {
    return t.find(function(t) {
        if (Array.isArray(t)) {
            if (n)
                return t.reduce(function(t, n) {
                    return t && e(n).length > 0
                }, !0);
            var r = pu(t, 2)
              , a = r[0]
              , i = r[1];
            return 1 === e(a).length && e(a).attr(i) && "" !== e(a).attr(i).trim()
        }
        return 1 === e(t).length && "" !== e(t).text().trim()
    })
}
function It(e) {
    var t = e.$
      , n = e.type
      , r = e.extractionOpts
      , a = e.extractHtml
      , i = void 0 !== a && a;
    if (!r)
        return null;
    if ("string" == typeof r)
        return r;
    var o = r.selectors
      , s = r.defaultCleaner
      , u = void 0 === s || s
      , c = Ft(t, o, i);
    if (!c)
        return null;
    var l = void 0;
    if (i)
        return Array.isArray(c) ? !function() {
            l = t(c.join(","));
            var e = t("<div></div>");
            l.each(function(t, n) {
                e.append(n)
            }),
            l = e
        }() : l = t(c),
        l.wrap(t("<div></div>")),
        l = l.parent(),
        l = Ht(l, t, r),
        l = Bt(l, t, r),
        l = wm[n](l, da({}, e, {
            defaultCleaner: u
        })),
        t.html(l);
    var f = void 0;
    if (Array.isArray(c)) {
        var d = pu(c, 2)
          , h = d[0]
          , p = d[1];
        f = t(h).attr(p).trim()
    } else {
        var m = t(c);
        m = Bt(m, t, r),
        m = Ht(m, t, r),
        f = m.text().trim()
    }
    return u ? wm[n](f, da({}, e, r)) : f
}
function Ut(e) {
    var t = e.type
      , n = e.extractor
      , r = e.fallback
      , a = void 0 === r || r
      , i = It(da({}, e, {
        extractionOpts: n[t]
    }));
    return i ? i : a ? hg[t](e) : null
}
var Gt = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}
  , $t = r
  , Vt = a;
"function" == typeof Gt.setTimeout && ($t = setTimeout),
"function" == typeof Gt.clearTimeout && (Vt = clearTimeout);
var Kt, Xt = [], Jt = !1, Zt = -1;
l.prototype.run = function() {
    this.fun.apply(null, this.array)
}
;
var Qt = "browser"
  , en = "browser"
  , tn = !0
  , nn = {}
  , rn = []
  , an = ""
  , on = {}
  , sn = {}
  , un = {}
  , cn = f
  , ln = f
  , fn = f
  , dn = f
  , hn = f
  , pn = f
  , mn = f
  , gn = Gt.performance || {}
  , vn = gn.now || gn.mozNow || gn.msNow || gn.oNow || gn.webkitNow || function() {
    return (new Date).getTime()
}
  , yn = new Date
  , bn = {
    nextTick: c,
    title: Qt,
    browser: tn,
    env: nn,
    argv: rn,
    version: an,
    versions: on,
    on: cn,
    addListener: ln,
    once: fn,
    off: dn,
    removeListener: hn,
    removeAllListeners: pn,
    emit: mn,
    binding: d,
    cwd: h,
    chdir: p,
    umask: m,
    hrtime: g,
    platform: en,
    release: sn,
    config: un,
    uptime: v
}
  , _n = n(function(e) {
    !function(t) {
        function n(e, t, n, r) {
            var i = t && t.prototype instanceof a ? t : a
              , o = Object.create(i.prototype)
              , s = new h(r || []);
            return o._invoke = l(e, n, s),
            o
        }
        function r(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        function a() {}
        function i() {}
        function o() {}
        function s(e) {
            ["next", "throw", "return"].forEach(function(t) {
                e[t] = function(e) {
                    return this._invoke(t, e)
                }
            })
        }
        function u(e) {
            this.arg = e
        }
        function c(e) {
            function t(n, a, i, o) {
                var s = r(e[n], e, a);
                if ("throw" !== s.type) {
                    var c = s.arg
                      , l = c.value;
                    return l instanceof u ? Promise.resolve(l.arg).then(function(e) {
                        t("next", e, i, o)
                    }, function(e) {
                        t("throw", e, i, o)
                    }) : Promise.resolve(l).then(function(e) {
                        c.value = e,
                        i(c)
                    }, o)
                }
                o(s.arg)
            }
            function n(e, n) {
                function r() {
                    return new Promise(function(r, a) {
                        t(e, n, r, a)
                    }
                    )
                }
                return a = a ? a.then(r, r) : r()
            }
            "object" == typeof bn && bn.domain && (t = bn.domain.bind(t));
            var a;
            this._invoke = n
        }
        function l(e, t, n) {
            var a = x;
            return function(i, o) {
                if (a === k)
                    throw new Error("Generator is already running");
                if (a === T) {
                    if ("throw" === i)
                        throw o;
                    return m()
                }
                for (; ; ) {
                    var s = n.delegate;
                    if (s) {
                        if ("return" === i || "throw" === i && s.iterator[i] === g) {
                            n.delegate = null;
                            var u = s.iterator.return;
                            if (u) {
                                var c = r(u, s.iterator, o);
                                if ("throw" === c.type) {
                                    i = "throw",
                                    o = c.arg;
                                    continue
                                }
                            }
                            if ("return" === i)
                                continue
                        }
                        var c = r(s.iterator[i], s.iterator, o);
                        if ("throw" === c.type) {
                            n.delegate = null,
                            i = "throw",
                            o = c.arg;
                            continue
                        }
                        i = "next",
                        o = g;
                        var l = c.arg;
                        if (!l.done)
                            return a = M,
                            l;
                        n[s.resultName] = l.value,
                        n.next = s.nextLoc,
                        n.delegate = null
                    }
                    if ("next" === i)
                        n.sent = n._sent = o;
                    else if ("throw" === i) {
                        if (a === x)
                            throw a = T,
                            o;
                        n.dispatchException(o) && (i = "next",
                        o = g)
                    } else
                        "return" === i && n.abrupt("return", o);
                    a = k;
                    var c = r(e, t, n);
                    if ("normal" === c.type) {
                        a = n.done ? T : M;
                        var l = {
                            value: c.arg,
                            done: n.done
                        };
                        if (c.arg !== S)
                            return l;
                        n.delegate && "next" === i && (o = g)
                    } else
                        "throw" === c.type && (a = T,
                        i = "throw",
                        o = c.arg)
                }
            }
        }
        function f(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]),
            2 in e && (t.finallyLoc = e[2],
            t.afterLoc = e[3]),
            this.tryEntries.push(t)
        }
        function d(e) {
            var t = e.completion || {};
            t.type = "normal",
            delete t.arg,
            e.completion = t
        }
        function h(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }],
            e.forEach(f, this),
            this.reset(!0)
        }
        function p(e) {
            if (e) {
                var t = e[b];
                if (t)
                    return t.call(e);
                if ("function" == typeof e.next)
                    return e;
                if (!isNaN(e.length)) {
                    var n = -1
                      , r = function t() {
                        for (; ++n < e.length; )
                            if (v.call(e, n))
                                return t.value = e[n],
                                t.done = !1,
                                t;
                        return t.value = g,
                        t.done = !0,
                        t
                    };
                    return r.next = r
                }
            }
            return {
                next: m
            }
        }
        function m() {
            return {
                value: g,
                done: !0
            }
        }
        var g, v = Object.prototype.hasOwnProperty, y = "function" == typeof Symbol ? Symbol : {}, b = y.iterator || "@@iterator", _ = y.toStringTag || "@@toStringTag", w = "object" == typeof e, A = t.regeneratorRuntime;
        if (A)
            return void (w && (e.exports = A));
        A = t.regeneratorRuntime = w ? e.exports : {},
        A.wrap = n;
        var x = "suspendedStart"
          , M = "suspendedYield"
          , k = "executing"
          , T = "completed"
          , S = {}
          , E = o.prototype = a.prototype;
        i.prototype = E.constructor = o,
        o.constructor = i,
        o[_] = i.displayName = "GeneratorFunction",
        A.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === i || "GeneratorFunction" === (t.displayName || t.name))
        }
        ,
        A.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : (e.__proto__ = o,
            _ in e || (e[_] = "GeneratorFunction")),
            e.prototype = Object.create(E),
            e
        }
        ,
        A.awrap = function(e) {
            return new u(e)
        }
        ,
        s(c.prototype),
        A.async = function(e, t, r, a) {
            var i = new c(n(e, t, r, a));
            return A.isGeneratorFunction(t) ? i : i.next().then(function(e) {
                return e.done ? e.value : i.next()
            })
        }
        ,
        s(E),
        E[b] = function() {
            return this
        }
        ,
        E[_] = "Generator",
        E.toString = function() {
            return "[object Generator]"
        }
        ,
        A.keys = function(e) {
            var t = [];
            for (var n in e)
                t.push(n);
            return t.reverse(),
            function n() {
                for (; t.length; ) {
                    var r = t.pop();
                    if (r in e)
                        return n.value = r,
                        n.done = !1,
                        n
                }
                return n.done = !0,
                n
            }
        }
        ,
        A.values = p,
        h.prototype = {
            constructor: h,
            reset: function(e) {
                if (this.prev = 0,
                this.next = 0,
                this.sent = this._sent = g,
                this.done = !1,
                this.delegate = null,
                this.tryEntries.forEach(d),
                !e)
                    for (var t in this)
                        "t" === t.charAt(0) && v.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = g)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0]
                  , t = e.completion;
                if ("throw" === t.type)
                    throw t.arg;
                return this.rval
            },
            dispatchException: function(e) {
                function t(t, r) {
                    return i.type = "throw",
                    i.arg = e,
                    n.next = t,
                    !!r
                }
                if (this.done)
                    throw e;
                for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                    var a = this.tryEntries[r]
                      , i = a.completion;
                    if ("root" === a.tryLoc)
                        return t("end");
                    if (a.tryLoc <= this.prev) {
                        var o = v.call(a, "catchLoc")
                          , s = v.call(a, "finallyLoc");
                        if (o && s) {
                            if (this.prev < a.catchLoc)
                                return t(a.catchLoc, !0);
                            if (this.prev < a.finallyLoc)
                                return t(a.finallyLoc)
                        } else if (o) {
                            if (this.prev < a.catchLoc)
                                return t(a.catchLoc, !0)
                        } else {
                            if (!s)
                                throw new Error("try statement without catch or finally");
                            if (this.prev < a.finallyLoc)
                                return t(a.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var r = this.tryEntries[n];
                    if (r.tryLoc <= this.prev && v.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                        var a = r;
                        break
                    }
                }
                a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                var i = a ? a.completion : {};
                return i.type = e,
                i.arg = t,
                a ? this.next = a.finallyLoc : this.complete(i),
                S
            },
            complete: function(e, t) {
                if ("throw" === e.type)
                    throw e.arg;
                "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = e.arg,
                this.next = "end") : "normal" === e.type && t && (this.next = t)
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e)
                        return this.complete(n.completion, n.afterLoc),
                        d(n),
                        S
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var a = r.arg;
                            d(n)
                        }
                        return a
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: p(e),
                    resultName: t,
                    nextLoc: n
                },
                S
            }
        }
    }("object" == typeof Gt ? Gt : "object" == typeof window ? window : "object" == typeof self ? self : this)
})
  , wn = "object" == typeof Gt ? Gt : "object" == typeof window ? window : "object" == typeof self ? self : void 0
  , An = wn.regeneratorRuntime && Object.getOwnPropertyNames(wn).indexOf("regeneratorRuntime") >= 0
  , xn = An && wn.regeneratorRuntime;
wn.regeneratorRuntime = void 0;
var Mn = _n;
if (An)
    wn.regeneratorRuntime = xn;
else
    try {
        delete wn.regeneratorRuntime
    } catch (e) {
        wn.regeneratorRuntime = void 0
    }
var kn = Mn
  , Tn = n(function(e) {
    var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = t)
})
  , Sn = n(function(e) {
    var t = e.exports = {
        version: "2.4.0"
    };
    "number" == typeof __e && (__e = t)
})
  , En = function(e) {
    if ("function" != typeof e)
        throw TypeError(e + " is not a function!");
    return e
}
  , Cn = En
  , On = function(e, t, n) {
    if (Cn(e),
    void 0 === t)
        return e;
    switch (n) {
    case 1:
        return function(n) {
            return e.call(t, n)
        }
        ;
    case 2:
        return function(n, r) {
            return e.call(t, n, r)
        }
        ;
    case 3:
        return function(n, r, a) {
            return e.call(t, n, r, a)
        }
    }
    return function() {
        return e.apply(t, arguments)
    }
}
  , Dn = function(e) {
    return "object" == typeof e ? null !== e : "function" == typeof e
}
  , jn = Dn
  , Pn = function(e) {
    if (!jn(e))
        throw TypeError(e + " is not an object!");
    return e
}
  , zn = function(e) {
    try {
        return !!e()
    } catch (e) {
        return !0
    }
}
  , Nn = !zn(function() {
    return 7 != Object.defineProperty({}, "a", {
        get: function() {
            return 7
        }
    }).a
})
  , Wn = Dn
  , Ln = Tn.document
  , Rn = Wn(Ln) && Wn(Ln.createElement)
  , qn = function(e) {
    return Rn ? Ln.createElement(e) : {}
}
  , Yn = !Nn && !zn(function() {
    return 7 != Object.defineProperty(qn("div"), "a", {
        get: function() {
            return 7
        }
    }).a
})
  , Bn = Dn
  , Hn = function(e, t) {
    if (!Bn(e))
        return e;
    var n, r;
    if (t && "function" == typeof (n = e.toString) && !Bn(r = n.call(e)))
        return r;
    if ("function" == typeof (n = e.valueOf) && !Bn(r = n.call(e)))
        return r;
    if (!t && "function" == typeof (n = e.toString) && !Bn(r = n.call(e)))
        return r;
    throw TypeError("Can't convert object to primitive value")
}
  , Fn = Pn
  , In = Yn
  , Un = Hn
  , Gn = Object.defineProperty
  , $n = Nn ? Object.defineProperty : function(e, t, n) {
    if (Fn(e),
    t = Un(t, !0),
    Fn(n),
    In)
        try {
            return Gn(e, t, n)
        } catch (e) {}
    if ("get"in n || "set"in n)
        throw TypeError("Accessors not supported!");
    return "value"in n && (e[t] = n.value),
    e
}
  , Vn = {
    f: $n
}
  , Kn = function(e, t) {
    return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
    }
}
  , Xn = Vn
  , Jn = Kn
  , Zn = Nn ? function(e, t, n) {
    return Xn.f(e, t, Jn(1, n))
}
: function(e, t, n) {
    return e[t] = n,
    e
}
  , Qn = Tn
  , er = Sn
  , tr = On
  , nr = Zn
  , rr = "prototype"
  , ar = function(e, t, n) {
    var r, a, i, o = e & ar.F, s = e & ar.G, u = e & ar.S, c = e & ar.P, l = e & ar.B, f = e & ar.W, d = s ? er : er[t] || (er[t] = {}), h = d[rr], p = s ? Qn : u ? Qn[t] : (Qn[t] || {})[rr];
    s && (n = t);
    for (r in n)
        a = !o && p && void 0 !== p[r],
        a && r in d || (i = a ? p[r] : n[r],
        d[r] = s && "function" != typeof p[r] ? n[r] : l && a ? tr(i, Qn) : f && p[r] == i ? function(e) {
            var t = function(t, n, r) {
                if (this instanceof e) {
                    switch (arguments.length) {
                    case 0:
                        return new e;
                    case 1:
                        return new e(t);
                    case 2:
                        return new e(t,n)
                    }
                    return new e(t,n,r)
                }
                return e.apply(this, arguments)
            };
            return t[rr] = e[rr],
            t
        }(i) : c && "function" == typeof i ? tr(Function.call, i) : i,
        c && ((d.virtual || (d.virtual = {}))[r] = i,
        e & ar.R && h && !h[r] && nr(h, r, i)))
};
ar.F = 1,
ar.G = 2,
ar.S = 4,
ar.P = 8,
ar.B = 16,
ar.W = 32,
ar.U = 64,
ar.R = 128;
var ir = ar
  , or = {}.hasOwnProperty
  , sr = function(e, t) {
    return or.call(e, t)
}
  , ur = {}.toString
  , cr = function(e) {
    return ur.call(e).slice(8, -1)
}
  , lr = cr
  , fr = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
    return "String" == lr(e) ? e.split("") : Object(e)
}
  , dr = function(e) {
    if (void 0 == e)
        throw TypeError("Can't call method on  " + e);
    return e
}
  , hr = fr
  , pr = dr
  , mr = function(e) {
    return hr(pr(e))
}
  , gr = Math.ceil
  , vr = Math.floor
  , yr = function(e) {
    return isNaN(e = +e) ? 0 : (e > 0 ? vr : gr)(e)
}
  , br = yr
  , _r = Math.min
  , wr = function(e) {
    return e > 0 ? _r(br(e), 9007199254740991) : 0
}
  , Ar = yr
  , xr = Math.max
  , Mr = Math.min
  , kr = function(e, t) {
    return e = Ar(e),
    e < 0 ? xr(e + t, 0) : Mr(e, t)
}
  , Tr = mr
  , Sr = wr
  , Er = kr
  , Cr = function(e) {
    return function(t, n, r) {
        var a, i = Tr(t), o = Sr(i.length), s = Er(r, o);
        if (e && n != n) {
            for (; o > s; )
                if (a = i[s++],
                a != a)
                    return !0
        } else
            for (; o > s; s++)
                if ((e || s in i) && i[s] === n)
                    return e || s || 0;
        return !e && -1
    }
}
  , Or = Tn
  , Dr = "__core-js_shared__"
  , jr = Or[Dr] || (Or[Dr] = {})
  , Pr = function(e) {
    return jr[e] || (jr[e] = {})
}
  , zr = 0
  , Nr = Math.random()
  , Wr = function(e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++zr + Nr).toString(36))
}
  , Lr = Pr("keys")
  , Rr = Wr
  , qr = function(e) {
    return Lr[e] || (Lr[e] = Rr(e))
}
  , Yr = sr
  , Br = mr
  , Hr = Cr(!1)
  , Fr = qr("IE_PROTO")
  , Ir = function(e, t) {
    var n, r = Br(e), a = 0, i = [];
    for (n in r)
        n != Fr && Yr(r, n) && i.push(n);
    for (; t.length > a; )
        Yr(r, n = t[a++]) && (~Hr(i, n) || i.push(n));
    return i
}
  , Ur = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
  , Gr = Ir
  , $r = Ur
  , Vr = Object.keys || function(e) {
    return Gr(e, $r)
}
  , Kr = Object.getOwnPropertySymbols
  , Xr = {
    f: Kr
}
  , Jr = {}.propertyIsEnumerable
  , Zr = {
    f: Jr
}
  , Qr = dr
  , ea = function(e) {
    return Object(Qr(e))
}
  , ta = Vr
  , na = Xr
  , ra = Zr
  , aa = ea
  , ia = fr
  , oa = Object.assign
  , sa = !oa || zn(function() {
    var e = {}
      , t = {}
      , n = Symbol()
      , r = "abcdefghijklmnopqrst";
    return e[n] = 7,
    r.split("").forEach(function(e) {
        t[e] = e
    }),
    7 != oa({}, e)[n] || Object.keys(oa({}, t)).join("") != r
}) ? function(e, t) {
    for (var n = aa(e), r = arguments.length, a = 1, i = na.f, o = ra.f; r > a; )
        for (var s, u = ia(arguments[a++]), c = i ? ta(u).concat(i(u)) : ta(u), l = c.length, f = 0; l > f; )
            o.call(u, s = c[f++]) && (n[s] = u[s]);
    return n
}
: oa
  , ua = ir;
ua(ua.S + ua.F, "Object", {
    assign: sa
});
var ca = Sn.Object.assign
  , la = n(function(e) {
    e.exports = {
        default: ca,
        __esModule: !0
    }
})
  , fa = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = la
      , a = n(r);
    t.default = a.default || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
})
  , da = t(fa)
  , ha = yr
  , pa = dr
  , ma = function(e) {
    return function(t, n) {
        var r, a, i = String(pa(t)), o = ha(n), s = i.length;
        return o < 0 || o >= s ? e ? "" : void 0 : (r = i.charCodeAt(o),
        r < 55296 || r > 56319 || o + 1 === s || (a = i.charCodeAt(o + 1)) < 56320 || a > 57343 ? e ? i.charAt(o) : r : e ? i.slice(o, o + 2) : (r - 55296 << 10) + (a - 56320) + 65536)
    }
}
  , ga = !0
  , va = Zn
  , ya = {}
  , ba = Vn
  , _a = Pn
  , wa = Vr
  , Aa = Nn ? Object.defineProperties : function(e, t) {
    _a(e);
    for (var n, r = wa(t), a = r.length, i = 0; a > i; )
        ba.f(e, n = r[i++], t[n]);
    return e
}
  , xa = Tn.document && document.documentElement
  , Ma = Pn
  , ka = Aa
  , Ta = Ur
  , Sa = qr("IE_PROTO")
  , Ea = function() {}
  , Ca = "prototype"
  , Oa = function() {
    var e, t = qn("iframe"), n = Ta.length, r = "<", a = ">";
    for (t.style.display = "none",
    xa.appendChild(t),
    t.src = "javascript:",
    e = t.contentWindow.document,
    e.open(),
    e.write(r + "script" + a + "document.F=Object" + r + "/script" + a),
    e.close(),
    Oa = e.F; n--; )
        delete Oa[Ca][Ta[n]];
    return Oa()
}
  , Da = Object.create || function(e, t) {
    var n;
    return null !== e ? (Ea[Ca] = Ma(e),
    n = new Ea,
    Ea[Ca] = null,
    n[Sa] = e) : n = Oa(),
    void 0 === t ? n : ka(n, t)
}
  , ja = n(function(e) {
    var t = Pr("wks")
      , n = Wr
      , r = Tn.Symbol
      , a = "function" == typeof r
      , i = e.exports = function(e) {
        return t[e] || (t[e] = a && r[e] || (a ? r : n)("Symbol." + e))
    }
    ;
    i.store = t
})
  , Pa = Vn.f
  , za = sr
  , Na = ja("toStringTag")
  , Wa = function(e, t, n) {
    e && !za(e = n ? e : e.prototype, Na) && Pa(e, Na, {
        configurable: !0,
        value: t
    })
}
  , La = Da
  , Ra = Kn
  , qa = Wa
  , Ya = {};
Zn(Ya, ja("iterator"), function() {
    return this
});
var Ba = function(e, t, n) {
    e.prototype = La(Ya, {
        next: Ra(1, n)
    }),
    qa(e, t + " Iterator")
}
  , Ha = sr
  , Fa = ea
  , Ia = qr("IE_PROTO")
  , Ua = Object.prototype
  , Ga = Object.getPrototypeOf || function(e) {
    return e = Fa(e),
    Ha(e, Ia) ? e[Ia] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? Ua : null
}
  , $a = ga
  , Va = ir
  , Ka = va
  , Xa = Zn
  , Ja = sr
  , Za = ya
  , Qa = Ba
  , ei = Wa
  , ti = Ga
  , ni = ja("iterator")
  , ri = !([].keys && "next"in [].keys())
  , ai = "@@iterator"
  , ii = "keys"
  , oi = "values"
  , si = function() {
    return this
}
  , ui = function(e, t, n, r, a, i, o) {
    Qa(n, t, r);
    var s, u, c, l = function(e) {
        if (!ri && e in p)
            return p[e];
        switch (e) {
        case ii:
            return function() {
                return new n(this,e)
            }
            ;
        case oi:
            return function() {
                return new n(this,e)
            }
        }
        return function() {
            return new n(this,e)
        }
    }, f = t + " Iterator", d = a == oi, h = !1, p = e.prototype, m = p[ni] || p[ai] || a && p[a], g = m || l(a), v = a ? d ? l("entries") : g : void 0, y = "Array" == t ? p.entries || m : m;
    if (y && (c = ti(y.call(new e)),
    c !== Object.prototype && (ei(c, f, !0),
    $a || Ja(c, ni) || Xa(c, ni, si))),
    d && m && m.name !== oi && (h = !0,
    g = function() {
        return m.call(this)
    }
    ),
    $a && !o || !ri && !h && p[ni] || Xa(p, ni, g),
    Za[t] = g,
    Za[f] = si,
    a)
        if (s = {
            values: d ? g : l(oi),
            keys: i ? g : l(ii),
            entries: v
        },
        o)
            for (u in s)
                u in p || Ka(p, u, s[u]);
        else
            Va(Va.P + Va.F * (ri || h), t, s);
    return s
}
  , ci = ma(!0);
ui(String, "String", function(e) {
    this._t = String(e),
    this._i = 0
}, function() {
    var e, t = this._t, n = this._i;
    return n >= t.length ? {
        value: void 0,
        done: !0
    } : (e = ci(t, n),
    this._i += e.length,
    {
        value: e,
        done: !1
    })
});
var li = function() {}
  , fi = function(e, t) {
    return {
        value: t,
        done: !!e
    }
}
  , di = li
  , hi = fi
  , pi = ya
  , mi = mr;
ui(Array, "Array", function(e, t) {
    this._t = mi(e),
    this._i = 0,
    this._k = t
}, function() {
    var e = this._t
      , t = this._k
      , n = this._i++;
    return !e || n >= e.length ? (this._t = void 0,
    hi(1)) : "keys" == t ? hi(0, n) : "values" == t ? hi(0, e[n]) : hi(0, [n, e[n]])
}, "values");
pi.Arguments = pi.Array,
di("keys"),
di("values"),
di("entries");
for (var gi = Tn, vi = Zn, yi = ya, bi = ja("toStringTag"), _i = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], wi = 0; wi < 5; wi++) {
    var Ai = _i[wi]
      , xi = gi[Ai]
      , Mi = xi && xi.prototype;
    Mi && !Mi[bi] && vi(Mi, bi, Ai),
    yi[Ai] = yi.Array
}
var ki, Ti, Si, Ei = cr, Ci = ja("toStringTag"), Oi = "Arguments" == Ei(function() {
    return arguments
}()), Di = function(e, t) {
    try {
        return e[t]
    } catch (e) {}
}, ji = function(e) {
    var t, n, r;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = Di(t = Object(e), Ci)) ? n : Oi ? Ei(t) : "Object" == (r = Ei(t)) && "function" == typeof t.callee ? "Arguments" : r
}, Pi = function(e, t, n, r) {
    if (!(e instanceof t) || void 0 !== r && r in e)
        throw TypeError(n + ": incorrect invocation!");
    return e
}, zi = Pn, Ni = function(e, t, n, r) {
    try {
        return r ? t(zi(n)[0], n[1]) : t(n)
    } catch (t) {
        var a = e.return;
        throw void 0 !== a && zi(a.call(e)),
        t
    }
}, Wi = ya, Li = ja("iterator"), Ri = Array.prototype, qi = function(e) {
    return void 0 !== e && (Wi.Array === e || Ri[Li] === e)
}, Yi = ji, Bi = ja("iterator"), Hi = ya, Fi = Sn.getIteratorMethod = function(e) {
    if (void 0 != e)
        return e[Bi] || e["@@iterator"] || Hi[Yi(e)]
}
, Ii = n(function(e) {
    var t = On
      , n = Ni
      , r = qi
      , a = Pn
      , i = wr
      , o = Fi
      , s = {}
      , u = {}
      , c = e.exports = function(e, c, l, f, d) {
        var h, p, m, g, v = d ? function() {
            return e
        }
        : o(e), y = t(l, f, c ? 2 : 1), b = 0;
        if ("function" != typeof v)
            throw TypeError(e + " is not iterable!");
        if (r(v)) {
            for (h = i(e.length); h > b; b++)
                if (g = c ? y(a(p = e[b])[0], p[1]) : y(e[b]),
                g === s || g === u)
                    return g
        } else
            for (m = v.call(e); !(p = m.next()).done; )
                if (g = n(m, y, p.value, c),
                g === s || g === u)
                    return g
    }
    ;
    c.BREAK = s,
    c.RETURN = u
}), Ui = Pn, Gi = En, $i = ja("species"), Vi = function(e, t) {
    var n, r = Ui(e).constructor;
    return void 0 === r || void 0 == (n = Ui(r)[$i]) ? t : Gi(n)
}, Ki = function(e, t, n) {
    var r = void 0 === n;
    switch (t.length) {
    case 0:
        return r ? e() : e.call(n);
    case 1:
        return r ? e(t[0]) : e.call(n, t[0]);
    case 2:
        return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
    case 3:
        return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
    case 4:
        return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
    }
    return e.apply(n, t)
}, Xi = On, Ji = Ki, Zi = xa, Qi = qn, eo = Tn, to = eo.process, no = eo.setImmediate, ro = eo.clearImmediate, ao = eo.MessageChannel, io = 0, oo = {}, so = "onreadystatechange", uo = function() {
    var e = +this;
    if (oo.hasOwnProperty(e)) {
        var t = oo[e];
        delete oo[e],
        t()
    }
}, co = function(e) {
    uo.call(e.data)
};
no && ro || (no = function(e) {
    for (var t = [], n = 1; arguments.length > n; )
        t.push(arguments[n++]);
    return oo[++io] = function() {
        Ji("function" == typeof e ? e : Function(e), t)
    }
    ,
    ki(io),
    io
}
,
ro = function(e) {
    delete oo[e]
}
,
"process" == cr(to) ? ki = function(e) {
    to.nextTick(Xi(uo, e, 1))
}
: ao ? (Ti = new ao,
Si = Ti.port2,
Ti.port1.onmessage = co,
ki = Xi(Si.postMessage, Si, 1)) : eo.addEventListener && "function" == typeof postMessage && !eo.importScripts ? (ki = function(e) {
    eo.postMessage(e + "", "*")
}
,
eo.addEventListener("message", co, !1)) : ki = so in Qi("script") ? function(e) {
    Zi.appendChild(Qi("script"))[so] = function() {
        Zi.removeChild(this),
        uo.call(e)
    }
}
: function(e) {
    setTimeout(Xi(uo, e, 1), 0)
}
);
var lo = {
    set: no,
    clear: ro
}
  , fo = Tn
  , ho = lo.set
  , po = fo.MutationObserver || fo.WebKitMutationObserver
  , mo = fo.process
  , go = fo.Promise
  , vo = "process" == cr(mo)
  , yo = function() {
    var e, t, n, r = function() {
        var r, a;
        for (vo && (r = mo.domain) && r.exit(); e; ) {
            a = e.fn,
            e = e.next;
            try {
                a()
            } catch (r) {
                throw e ? n() : t = void 0,
                r
            }
        }
        t = void 0,
        r && r.enter()
    };
    if (vo)
        n = function() {
            mo.nextTick(r)
        }
        ;
    else if (po) {
        var a = !0
          , i = document.createTextNode("");
        new po(r).observe(i, {
            characterData: !0
        }),
        n = function() {
            i.data = a = !a
        }
    } else if (go && go.resolve) {
        var o = go.resolve();
        n = function() {
            o.then(r)
        }
    } else
        n = function() {
            ho.call(fo, r)
        }
        ;
    return function(r) {
        var a = {
            fn: r,
            next: void 0
        };
        t && (t.next = a),
        e || (e = a,
        n()),
        t = a
    }
}
  , bo = Zn
  , _o = function(e, t, n) {
    for (var r in t)
        n && e[r] ? e[r] = t[r] : bo(e, r, t[r]);
    return e
}
  , wo = Tn
  , Ao = Sn
  , xo = Vn
  , Mo = Nn
  , ko = ja("species")
  , To = function(e) {
    var t = "function" == typeof Ao[e] ? Ao[e] : wo[e];
    Mo && t && !t[ko] && xo.f(t, ko, {
        configurable: !0,
        get: function() {
            return this
        }
    })
}
  , So = ja("iterator")
  , Eo = !1;
try {
    var Co = [7][So]();
    Co.return = function() {
        Eo = !0
    }
    ,
    Array.from(Co, function() {
        throw 2
    })
} catch (e) {}
var Oo, Do, jo, Po = function(e, t) {
    if (!t && !Eo)
        return !1;
    var n = !1;
    try {
        var r = [7]
          , a = r[So]();
        a.next = function() {
            return {
                done: n = !0
            }
        }
        ,
        r[So] = function() {
            return a
        }
        ,
        e(r)
    } catch (e) {}
    return n
}, zo = ga, No = Tn, Wo = On, Lo = ji, Ro = ir, qo = Dn, Yo = En, Bo = Pi, Ho = Ii, Fo = Vi, Io = lo.set, Uo = yo(), Go = "Promise", $o = No.TypeError, Vo = No.process, Ko = No[Go], Vo = No.process, Xo = "process" == Lo(Vo), Jo = function() {}, Zo = !!function() {
    try {
        var e = Ko.resolve(1)
          , t = (e.constructor = {})[ja("species")] = function(e) {
            e(Jo, Jo)
        }
        ;
        return (Xo || "function" == typeof PromiseRejectionEvent) && e.then(Jo)instanceof t
    } catch (e) {}
}(), Qo = function(e, t) {
    return e === t || e === Ko && t === jo
}, es = function(e) {
    var t;
    return !(!qo(e) || "function" != typeof (t = e.then)) && t
}, ts = function(e) {
    return Qo(Ko, e) ? new ns(e) : new Do(e)
}, ns = Do = function(e) {
    var t, n;
    this.promise = new e(function(e, r) {
        if (void 0 !== t || void 0 !== n)
            throw $o("Bad Promise constructor");
        t = e,
        n = r
    }
    ),
    this.resolve = Yo(t),
    this.reject = Yo(n)
}
, rs = function(e) {
    try {
        e()
    } catch (e) {
        return {
            error: e
        }
    }
}, as = function(e, t) {
    if (!e._n) {
        e._n = !0;
        var n = e._c;
        Uo(function() {
            for (var r = e._v, a = 1 == e._s, i = 0, o = function(t) {
                var n, i, o = a ? t.ok : t.fail, s = t.resolve, u = t.reject, c = t.domain;
                try {
                    o ? (a || (2 == e._h && ss(e),
                    e._h = 1),
                    o === !0 ? n = r : (c && c.enter(),
                    n = o(r),
                    c && c.exit()),
                    n === t.promise ? u($o("Promise-chain cycle")) : (i = es(n)) ? i.call(n, s, u) : s(n)) : u(r)
                } catch (e) {
                    u(e)
                }
            }; n.length > i; )
                o(n[i++]);
            e._c = [],
            e._n = !1,
            t && !e._h && is(e)
        })
    }
}, is = function(e) {
    Io.call(No, function() {
        var t, n, r, a = e._v;
        if (os(e) && (t = rs(function() {
            Xo ? Vo.emit("unhandledRejection", a, e) : (n = No.onunhandledrejection) ? n({
                promise: e,
                reason: a
            }) : (r = No.console) && r.error && r.error("Unhandled promise rejection", a)
        }),
        e._h = Xo || os(e) ? 2 : 1),
        e._a = void 0,
        t)
            throw t.error
    })
}, os = function(e) {
    if (1 == e._h)
        return !1;
    for (var t, n = e._a || e._c, r = 0; n.length > r; )
        if (t = n[r++],
        t.fail || !os(t.promise))
            return !1;
    return !0
}, ss = function(e) {
    Io.call(No, function() {
        var t;
        Xo ? Vo.emit("rejectionHandled", e) : (t = No.onrejectionhandled) && t({
            promise: e,
            reason: e._v
        })
    })
}, us = function(e) {
    var t = this;
    t._d || (t._d = !0,
    t = t._w || t,
    t._v = e,
    t._s = 2,
    t._a || (t._a = t._c.slice()),
    as(t, !0))
}, cs = function(e) {
    var t, n = this;
    if (!n._d) {
        n._d = !0,
        n = n._w || n;
        try {
            if (n === e)
                throw $o("Promise can't be resolved itself");
            (t = es(e)) ? Uo(function() {
                var r = {
                    _w: n,
                    _d: !1
                };
                try {
                    t.call(e, Wo(cs, r, 1), Wo(us, r, 1))
                } catch (e) {
                    us.call(r, e)
                }
            }) : (n._v = e,
            n._s = 1,
            as(n, !1))
        } catch (e) {
            us.call({
                _w: n,
                _d: !1
            }, e)
        }
    }
};
Zo || (Ko = function(e) {
    Bo(this, Ko, Go, "_h"),
    Yo(e),
    Oo.call(this);
    try {
        e(Wo(cs, this, 1), Wo(us, this, 1))
    } catch (e) {
        us.call(this, e)
    }
}
,
Oo = function(e) {
    this._c = [],
    this._a = void 0,
    this._s = 0,
    this._d = !1,
    this._v = void 0,
    this._h = 0,
    this._n = !1
}
,
Oo.prototype = _o(Ko.prototype, {
    then: function(e, t) {
        var n = ts(Fo(this, Ko));
        return n.ok = "function" != typeof e || e,
        n.fail = "function" == typeof t && t,
        n.domain = Xo ? Vo.domain : void 0,
        this._c.push(n),
        this._a && this._a.push(n),
        this._s && as(this, !1),
        n.promise
    },
    catch: function(e) {
        return this.then(void 0, e)
    }
}),
ns = function() {
    var e = new Oo;
    this.promise = e,
    this.resolve = Wo(cs, e, 1),
    this.reject = Wo(us, e, 1)
}
),
Ro(Ro.G + Ro.W + Ro.F * !Zo, {
    Promise: Ko
}),
Wa(Ko, Go),
To(Go),
jo = Sn[Go],
Ro(Ro.S + Ro.F * !Zo, Go, {
    reject: function(e) {
        var t = ts(this)
          , n = t.reject;
        return n(e),
        t.promise
    }
}),
Ro(Ro.S + Ro.F * (zo || !Zo), Go, {
    resolve: function(e) {
        if (e instanceof Ko && Qo(e.constructor, this))
            return e;
        var t = ts(this)
          , n = t.resolve;
        return n(e),
        t.promise
    }
}),
Ro(Ro.S + Ro.F * !(Zo && Po(function(e) {
    Ko.all(e).catch(Jo)
})), Go, {
    all: function(e) {
        var t = this
          , n = ts(t)
          , r = n.resolve
          , a = n.reject
          , i = rs(function() {
            var n = []
              , i = 0
              , o = 1;
            Ho(e, !1, function(e) {
                var s = i++
                  , u = !1;
                n.push(void 0),
                o++,
                t.resolve(e).then(function(e) {
                    u || (u = !0,
                    n[s] = e,
                    --o || r(n))
                }, a)
            }),
            --o || r(n)
        });
        return i && a(i.error),
        n.promise
    },
    race: function(e) {
        var t = this
          , n = ts(t)
          , r = n.reject
          , a = rs(function() {
            Ho(e, !1, function(e) {
                t.resolve(e).then(n.resolve, r)
            })
        });
        return a && r(a.error),
        n.promise
    }
});
var ls = Sn.Promise
  , fs = n(function(e) {
    e.exports = {
        default: ls,
        __esModule: !0
    }
})
  , ds = t(fs)
  , hs = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = fs
      , a = n(r);
    t.default = function(e) {
        return function() {
            var t = e.apply(this, arguments);
            return new a.default(function(e, n) {
                function r(i, o) {
                    try {
                        var s = t[i](o)
                          , u = s.value
                    } catch (e) {
                        return void n(e)
                    }
                    return s.done ? void e(u) : a.default.resolve(u).then(function(e) {
                        r("next", e)
                    }, function(e) {
                        r("throw", e)
                    })
                }
                return r("next")
            }
            )
        }
    }
})
  , ps = t(hs)
  , ms = {
    isString: function(e) {
        return "string" == typeof e
    },
    isObject: function(e) {
        return "object" == typeof e && null !== e
    },
    isNull: function(e) {
        return null === e
    },
    isNullOrUndefined: function(e) {
        return null == e
    }
}
  , gs = function(e, t, n, r) {
    t = t || "&",
    n = n || "=";
    var a = {};
    if ("string" != typeof e || 0 === e.length)
        return a;
    var i = /\+/g;
    e = e.split(t);
    var o = 1e3;
    r && "number" == typeof r.maxKeys && (o = r.maxKeys);
    var s = e.length;
    o > 0 && s > o && (s = o);
    for (var u = 0; u < s; ++u) {
        var c, l, f, d, h = e[u].replace(i, "%20"), p = h.indexOf(n);
        p >= 0 ? (c = h.substr(0, p),
        l = h.substr(p + 1)) : (c = h,
        l = ""),
        f = decodeURIComponent(c),
        d = decodeURIComponent(l),
        y(a, f) ? Array.isArray(a[f]) ? a[f].push(d) : a[f] = [a[f], d] : a[f] = d
    }
    return a
}
  , vs = function(e) {
    switch (typeof e) {
    case "string":
        return e;
    case "boolean":
        return e ? "true" : "false";
    case "number":
        return isFinite(e) ? e : "";
    default:
        return ""
    }
}
  , ys = function(e, t, n, r) {
    return t = t || "&",
    n = n || "=",
    null === e && (e = void 0),
    "object" == typeof e ? Object.keys(e).map(function(r) {
        var a = encodeURIComponent(vs(r)) + n;
        return Array.isArray(e[r]) ? e[r].map(function(e) {
            return a + encodeURIComponent(vs(e))
        }).join(t) : a + encodeURIComponent(vs(e[r]))
    }).join(t) : r ? encodeURIComponent(vs(r)) + n + encodeURIComponent(vs(e)) : ""
}
  , bs = n(function(e, t) {
    t.decode = t.parse = gs,
    t.encode = t.stringify = ys
})
  , _s = ms
  , ws = _
  , As = A
  , xs = x
  , Ms = w
  , ks = b
  , Ts = /^([a-z0-9.+-]+:)/i
  , Ss = /:[0-9]*$/
  , Es = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
  , Cs = ["<", ">", '"', "`", " ", "\r", "\n", "\t"]
  , Os = ["{", "}", "|", "\\", "^", "`"].concat(Cs)
  , Ds = ["'"].concat(Os)
  , js = ["%", "/", "?", ";", "#"].concat(Ds)
  , Ps = ["/", "?", "#"]
  , zs = 255
  , Ns = /^[+a-z0-9A-Z_-]{0,63}$/
  , Ws = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
  , Ls = {
    javascript: !0,
    "javascript:": !0
}
  , Rs = {
    javascript: !0,
    "javascript:": !0
}
  , qs = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
}
  , Ys = bs;
b.prototype.parse = function(e, t, n) {
    if (!_s.isString(e))
        throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
    var r = e.indexOf("?")
      , a = r !== -1 && r < e.indexOf("#") ? "?" : "#"
      , i = e.split(a)
      , o = /\\/g;
    i[0] = i[0].replace(o, "/"),
    e = i.join(a);
    var s = e;
    if (s = s.trim(),
    !n && 1 === e.split("#").length) {
        var u = Es.exec(s);
        if (u)
            return this.path = s,
            this.href = s,
            this.pathname = u[1],
            u[2] ? (this.search = u[2],
            t ? this.query = Ys.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : t && (this.search = "",
            this.query = {}),
            this
    }
    var c = Ts.exec(s);
    if (c) {
        c = c[0];
        var l = c.toLowerCase();
        this.protocol = l,
        s = s.substr(c.length)
    }
    if (n || c || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var f = "//" === s.substr(0, 2);
        !f || c && Rs[c] || (s = s.substr(2),
        this.slashes = !0)
    }
    if (!Rs[c] && (f || c && !qs[c])) {
        for (var d = -1, h = 0; h < Ps.length; h++) {
            var p = s.indexOf(Ps[h]);
            p !== -1 && (d === -1 || p < d) && (d = p)
        }
        var m, g;
        g = d === -1 ? s.lastIndexOf("@") : s.lastIndexOf("@", d),
        g !== -1 && (m = s.slice(0, g),
        s = s.slice(g + 1),
        this.auth = decodeURIComponent(m)),
        d = -1;
        for (var h = 0; h < js.length; h++) {
            var p = s.indexOf(js[h]);
            p !== -1 && (d === -1 || p < d) && (d = p)
        }
        d === -1 && (d = s.length),
        this.host = s.slice(0, d),
        s = s.slice(d),
        this.parseHost(),
        this.hostname = this.hostname || "";
        var v = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!v)
            for (var y = this.hostname.split(/\./), h = 0, b = y.length; h < b; h++) {
                var _ = y[h];
                if (_ && !_.match(Ns)) {
                    for (var w = "", A = 0, x = _.length; A < x; A++)
                        w += _.charCodeAt(A) > 127 ? "x" : _[A];
                    if (!w.match(Ns)) {
                        var M = y.slice(0, h)
                          , k = y.slice(h + 1)
                          , T = _.match(Ws);
                        T && (M.push(T[1]),
                        k.unshift(T[2])),
                        k.length && (s = "/" + k.join(".") + s),
                        this.hostname = M.join(".");
                        break
                    }
                }
            }
        this.hostname.length > zs ? this.hostname = "" : this.hostname = this.hostname.toLowerCase();
        var S = this.port ? ":" + this.port : ""
          , E = this.hostname || "";
        this.host = E + S,
        this.href += this.host,
        v && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
        "/" !== s[0] && (s = "/" + s))
    }
    if (!Ls[l])
        for (var h = 0, b = Ds.length; h < b; h++) {
            var C = Ds[h];
            if (s.indexOf(C) !== -1) {
                var O = encodeURIComponent(C);
                O === C && (O = escape(C)),
                s = s.split(C).join(O)
            }
        }
    var D = s.indexOf("#");
    D !== -1 && (this.hash = s.substr(D),
    s = s.slice(0, D));
    var j = s.indexOf("?");
    if (j !== -1 ? (this.search = s.substr(j),
    this.query = s.substr(j + 1),
    t && (this.query = Ys.parse(this.query)),
    s = s.slice(0, j)) : t && (this.search = "",
    this.query = {}),
    s && (this.pathname = s),
    qs[l] && this.hostname && !this.pathname && (this.pathname = "/"),
    this.pathname || this.search) {
        var S = this.pathname || ""
          , P = this.search || "";
        this.path = S + P
    }
    return this.href = this.format(),
    this
}
,
b.prototype.format = function() {
    var e = this.auth || "";
    e && (e = encodeURIComponent(e),
    e = e.replace(/%3A/i, ":"),
    e += "@");
    var t = this.protocol || ""
      , n = this.pathname || ""
      , r = this.hash || ""
      , a = !1
      , i = "";
    this.host ? a = e + this.host : this.hostname && (a = e + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"),
    this.port && (a += ":" + this.port)),
    this.query && _s.isObject(this.query) && Object.keys(this.query).length && (i = Ys.stringify(this.query));
    var o = this.search || i && "?" + i || "";
    return t && ":" !== t.substr(-1) && (t += ":"),
    this.slashes || (!t || qs[t]) && a !== !1 ? (a = "//" + (a || ""),
    n && "/" !== n.charAt(0) && (n = "/" + n)) : a || (a = ""),
    r && "#" !== r.charAt(0) && (r = "#" + r),
    o && "?" !== o.charAt(0) && (o = "?" + o),
    n = n.replace(/[?#]/g, function(e) {
        return encodeURIComponent(e)
    }),
    o = o.replace("#", "%23"),
    t + a + n + o + r
}
,
b.prototype.resolve = function(e) {
    return this.resolveObject(_(e, !1, !0)).format()
}
,
b.prototype.resolveObject = function(e) {
    if (_s.isString(e)) {
        var t = new b;
        t.parse(e, !1, !0),
        e = t
    }
    for (var n = new b, r = Object.keys(this), a = 0; a < r.length; a++) {
        var i = r[a];
        n[i] = this[i]
    }
    if (n.hash = e.hash,
    "" === e.href)
        return n.href = n.format(),
        n;
    if (e.slashes && !e.protocol) {
        for (var o = Object.keys(e), s = 0; s < o.length; s++) {
            var u = o[s];
            "protocol" !== u && (n[u] = e[u])
        }
        return qs[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
        n.href = n.format(),
        n
    }
    if (e.protocol && e.protocol !== n.protocol) {
        if (!qs[e.protocol]) {
            for (var c = Object.keys(e), l = 0; l < c.length; l++) {
                var f = c[l];
                n[f] = e[f]
            }
            return n.href = n.format(),
            n
        }
        if (n.protocol = e.protocol,
        e.host || Rs[e.protocol])
            n.pathname = e.pathname;
        else {
            for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()); )
                ;
            e.host || (e.host = ""),
            e.hostname || (e.hostname = ""),
            "" !== d[0] && d.unshift(""),
            d.length < 2 && d.unshift(""),
            n.pathname = d.join("/")
        }
        if (n.search = e.search,
        n.query = e.query,
        n.host = e.host || "",
        n.auth = e.auth,
        n.hostname = e.hostname || e.host,
        n.port = e.port,
        n.pathname || n.search) {
            var h = n.pathname || ""
              , p = n.search || "";
            n.path = h + p
        }
        return n.slashes = n.slashes || e.slashes,
        n.href = n.format(),
        n
    }
    var m = n.pathname && "/" === n.pathname.charAt(0)
      , g = e.host || e.pathname && "/" === e.pathname.charAt(0)
      , v = g || m || n.host && e.pathname
      , y = v
      , _ = n.pathname && n.pathname.split("/") || []
      , d = e.pathname && e.pathname.split("/") || []
      , w = n.protocol && !qs[n.protocol];
    if (w && (n.hostname = "",
    n.port = null,
    n.host && ("" === _[0] ? _[0] = n.host : _.unshift(n.host)),
    n.host = "",
    e.protocol && (e.hostname = null,
    e.port = null,
    e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)),
    e.host = null),
    v = v && ("" === d[0] || "" === _[0])),
    g)
        n.host = e.host || "" === e.host ? e.host : n.host,
        n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
        n.search = e.search,
        n.query = e.query,
        _ = d;
    else if (d.length)
        _ || (_ = []),
        _.pop(),
        _ = _.concat(d),
        n.search = e.search,
        n.query = e.query;
    else if (!_s.isNullOrUndefined(e.search)) {
        if (w) {
            n.hostname = n.host = _.shift();
            var A = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
            A && (n.auth = A.shift(),
            n.host = n.hostname = A.shift())
        }
        return n.search = e.search,
        n.query = e.query,
        _s.isNull(n.pathname) && _s.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
        n.href = n.format(),
        n
    }
    if (!_.length)
        return n.pathname = null,
        n.search ? n.path = "/" + n.search : n.path = null,
        n.href = n.format(),
        n;
    for (var x = _.slice(-1)[0], M = (n.host || e.host || _.length > 1) && ("." === x || ".." === x) || "" === x, k = 0, T = _.length; T >= 0; T--)
        x = _[T],
        "." === x ? _.splice(T, 1) : ".." === x ? (_.splice(T, 1),
        k++) : k && (_.splice(T, 1),
        k--);
    if (!v && !y)
        for (; k--; k)
            _.unshift("..");
    !v || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""),
    M && "/" !== _.join("/").substr(-1) && _.push("");
    var S = "" === _[0] || _[0] && "/" === _[0].charAt(0);
    if (w) {
        n.hostname = n.host = S ? "" : _.length ? _.shift() : "";
        var A = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
        A && (n.auth = A.shift(),
        n.host = n.hostname = A.shift())
    }
    return v = v || n.host && _.length,
    v && !S && _.unshift(""),
    _.length ? n.pathname = _.join("/") : (n.pathname = null,
    n.path = null),
    _s.isNull(n.pathname) && _s.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
    n.auth = e.auth || n.auth,
    n.slashes = n.slashes || e.slashes,
    n.href = n.format(),
    n
}
,
b.prototype.parseHost = function() {
    var e = this.host
      , t = Ss.exec(e);
    t && (t = t[0],
    ":" !== t && (this.port = t.substr(1)),
    e = e.substr(0, e.length - t.length)),
    e && (this.hostname = e)
}
;
var Bs = {
    parse: ws,
    resolve: As,
    resolveObject: xs,
    format: Ms,
    Url: ks
}
  , Hs = n(function(e) {
    !function(t, n) {
        "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
            if (!e.document)
                throw new Error("jQuery requires a window with a document");
            return n(e)
        }
        : n(t)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e, t) {
            t = t || te;
            var n = t.createElement("script");
            n.text = e,
            t.head.appendChild(n).parentNode.removeChild(n)
        }
        function r(e) {
            var t = !!e && "length"in e && e.length
              , n = pe.type(e);
            return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }
        function a(e, t, n) {
            return pe.isFunction(t) ? pe.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            }) : t.nodeType ? pe.grep(e, function(e) {
                return e === t !== n
            }) : "string" != typeof t ? pe.grep(e, function(e) {
                return oe.call(t, e) > -1 !== n
            }) : Me.test(t) ? pe.filter(t, e, n) : (t = pe.filter(t, e),
            pe.grep(e, function(e) {
                return oe.call(t, e) > -1 !== n && 1 === e.nodeType
            }))
        }
        function i(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; )
                ;
            return e
        }
        function o(e) {
            var t = {};
            return pe.each(e.match(Oe) || [], function(e, n) {
                t[n] = !0
            }),
            t
        }
        function s(e) {
            return e
        }
        function u(e) {
            throw e
        }
        function c(e, t, n) {
            var r;
            try {
                e && pe.isFunction(r = e.promise) ? r.call(e).done(t).fail(n) : e && pe.isFunction(r = e.then) ? r.call(e, t, n) : t.call(void 0, e)
            } catch (e) {
                n.call(void 0, e)
            }
        }
        function l() {
            te.removeEventListener("DOMContentLoaded", l),
            e.removeEventListener("load", l),
            pe.ready()
        }
        function f() {
            this.expando = pe.expando + f.uid++
        }
        function d(e) {
            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Le.test(e) ? JSON.parse(e) : e)
        }
        function h(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
                if (r = "data-" + t.replace(Re, "-$&").toLowerCase(),
                n = e.getAttribute(r),
                "string" == typeof n) {
                    try {
                        n = d(n)
                    } catch (e) {}
                    We.set(e, t, n)
                } else
                    n = void 0;
            return n
        }
        function p(e, t, n, r) {
            var a, i = 1, o = 20, s = r ? function() {
                return r.cur()
            }
            : function() {
                return pe.css(e, t, "")
            }
            , u = s(), c = n && n[3] || (pe.cssNumber[t] ? "" : "px"), l = (pe.cssNumber[t] || "px" !== c && +u) && Ye.exec(pe.css(e, t));
            if (l && l[3] !== c) {
                c = c || l[3],
                n = n || [],
                l = +u || 1;
                do
                    i = i || ".5",
                    l /= i,
                    pe.style(e, t, l + c);
                while (i !== (i = s() / u) && 1 !== i && --o)
            }
            return n && (l = +l || +u || 0,
            a = n[1] ? l + (n[1] + 1) * n[2] : +n[2],
            r && (r.unit = c,
            r.start = l,
            r.end = a)),
            a
        }
        function m(e) {
            var t, n = e.ownerDocument, r = e.nodeName, a = Ie[r];
            return a ? a : (t = n.body.appendChild(n.createElement(r)),
            a = pe.css(t, "display"),
            t.parentNode.removeChild(t),
            "none" === a && (a = "block"),
            Ie[r] = a,
            a)
        }
        function g(e, t) {
            for (var n, r, a = [], i = 0, o = e.length; i < o; i++)
                r = e[i],
                r.style && (n = r.style.display,
                t ? ("none" === n && (a[i] = Ne.get(r, "display") || null,
                a[i] || (r.style.display = "")),
                "" === r.style.display && He(r) && (a[i] = m(r))) : "none" !== n && (a[i] = "none",
                Ne.set(r, "display", n)));
            for (i = 0; i < o; i++)
                null != a[i] && (e[i].style.display = a[i]);
            return e
        }
        function v(e, t) {
            var n;
            return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
            void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], n) : n
        }
        function y(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                Ne.set(e[n], "globalEval", !t || Ne.get(t[n], "globalEval"))
        }
        function b(e, t, n, r, a) {
            for (var i, o, s, u, c, l, f = t.createDocumentFragment(), d = [], h = 0, p = e.length; h < p; h++)
                if (i = e[h],
                i || 0 === i)
                    if ("object" === pe.type(i))
                        pe.merge(d, i.nodeType ? [i] : i);
                    else if (Ke.test(i)) {
                        for (o = o || f.appendChild(t.createElement("div")),
                        s = (Ge.exec(i) || ["", ""])[1].toLowerCase(),
                        u = Ve[s] || Ve._default,
                        o.innerHTML = u[1] + pe.htmlPrefilter(i) + u[2],
                        l = u[0]; l--; )
                            o = o.lastChild;
                        pe.merge(d, o.childNodes),
                        o = f.firstChild,
                        o.textContent = ""
                    } else
                        d.push(t.createTextNode(i));
            for (f.textContent = "",
            h = 0; i = d[h++]; )
                if (r && pe.inArray(i, r) > -1)
                    a && a.push(i);
                else if (c = pe.contains(i.ownerDocument, i),
                o = v(f.appendChild(i), "script"),
                c && y(o),
                n)
                    for (l = 0; i = o[l++]; )
                        $e.test(i.type || "") && n.push(i);
            return f
        }
        function _() {
            return !0
        }
        function w() {
            return !1
        }
        function A() {
            try {
                return te.activeElement
            } catch (e) {}
        }
        function x(e, t, n, r, a, i) {
            var o, s;
            if ("object" == typeof t) {
                "string" != typeof n && (r = r || n,
                n = void 0);
                for (s in t)
                    x(e, s, n, r, t[s], i);
                return e
            }
            if (null == r && null == a ? (a = n,
            r = n = void 0) : null == a && ("string" == typeof n ? (a = r,
            r = void 0) : (a = r,
            r = n,
            n = void 0)),
            a === !1)
                a = w;
            else if (!a)
                return e;
            return 1 === i && (o = a,
            a = function(e) {
                return pe().off(e),
                o.apply(this, arguments)
            }
            ,
            a.guid = o.guid || (o.guid = pe.guid++)),
            e.each(function() {
                pe.event.add(this, t, a, r, n)
            })
        }
        function M(e, t) {
            return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
        }
        function k(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
            e
        }
        function T(e) {
            var t = rt.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"),
            e
        }
        function S(e, t) {
            var n, r, a, i, o, s, u, c;
            if (1 === t.nodeType) {
                if (Ne.hasData(e) && (i = Ne.access(e),
                o = Ne.set(t, i),
                c = i.events)) {
                    delete o.handle,
                    o.events = {};
                    for (a in c)
                        for (n = 0,
                        r = c[a].length; n < r; n++)
                            pe.event.add(t, a, c[a][n])
                }
                We.hasData(e) && (s = We.access(e),
                u = pe.extend({}, s),
                We.set(t, u))
            }
        }
        function E(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && Ue.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
        function C(e, t, r, a) {
            t = ae.apply([], t);
            var i, o, s, u, c, l, f = 0, d = e.length, h = d - 1, p = t[0], m = pe.isFunction(p);
            if (m || d > 1 && "string" == typeof p && !de.checkClone && nt.test(p))
                return e.each(function(n) {
                    var i = e.eq(n);
                    m && (t[0] = p.call(this, n, i.html())),
                    C(i, t, r, a)
                });
            if (d && (i = b(t, e[0].ownerDocument, !1, e, a),
            o = i.firstChild,
            1 === i.childNodes.length && (i = o),
            o || a)) {
                for (s = pe.map(v(i, "script"), k),
                u = s.length; f < d; f++)
                    c = i,
                    f !== h && (c = pe.clone(c, !0, !0),
                    u && pe.merge(s, v(c, "script"))),
                    r.call(e[f], c, f);
                if (u)
                    for (l = s[s.length - 1].ownerDocument,
                    pe.map(s, T),
                    f = 0; f < u; f++)
                        c = s[f],
                        $e.test(c.type || "") && !Ne.access(c, "globalEval") && pe.contains(l, c) && (c.src ? pe._evalUrl && pe._evalUrl(c.src) : n(c.textContent.replace(at, ""), l))
            }
            return e
        }
        function O(e, t, n) {
            for (var r, a = t ? pe.filter(t, e) : e, i = 0; null != (r = a[i]); i++)
                n || 1 !== r.nodeType || pe.cleanData(v(r)),
                r.parentNode && (n && pe.contains(r.ownerDocument, r) && y(v(r, "script")),
                r.parentNode.removeChild(r));
            return e
        }
        function D(e, t, n) {
            var r, a, i, o, s = e.style;
            return n = n || st(e),
            n && (o = n.getPropertyValue(t) || n[t],
            "" !== o || pe.contains(e.ownerDocument, e) || (o = pe.style(e, t)),
            !de.pixelMarginRight() && ot.test(o) && it.test(t) && (r = s.width,
            a = s.minWidth,
            i = s.maxWidth,
            s.minWidth = s.maxWidth = s.width = o,
            o = n.width,
            s.width = r,
            s.minWidth = a,
            s.maxWidth = i)),
            void 0 !== o ? o + "" : o
        }
        function j(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }
        function P(e) {
            if (e in dt)
                return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = ft.length; n--; )
                if (e = ft[n] + t,
                e in dt)
                    return e
        }
        function z(e, t, n) {
            var r = Ye.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }
        function N(e, t, n, r, a) {
            var i, o = 0;
            for (i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; i < 4; i += 2)
                "margin" === n && (o += pe.css(e, n + Be[i], !0, a)),
                r ? ("content" === n && (o -= pe.css(e, "padding" + Be[i], !0, a)),
                "margin" !== n && (o -= pe.css(e, "border" + Be[i] + "Width", !0, a))) : (o += pe.css(e, "padding" + Be[i], !0, a),
                "padding" !== n && (o += pe.css(e, "border" + Be[i] + "Width", !0, a)));
            return o
        }
        function W(e, t, n) {
            var r, a = !0, i = st(e), o = "border-box" === pe.css(e, "boxSizing", !1, i);
            if (e.getClientRects().length && (r = e.getBoundingClientRect()[t]),
            r <= 0 || null == r) {
                if (r = D(e, t, i),
                (r < 0 || null == r) && (r = e.style[t]),
                ot.test(r))
                    return r;
                a = o && (de.boxSizingReliable() || r === e.style[t]),
                r = parseFloat(r) || 0
            }
            return r + N(e, t, n || (o ? "border" : "content"), a, i) + "px"
        }
        function L(e, t, n, r, a) {
            return new L.prototype.init(e,t,n,r,a)
        }
        function R() {
            pt && (e.requestAnimationFrame(R),
            pe.fx.tick())
        }
        function q() {
            return e.setTimeout(function() {
                ht = void 0
            }),
            ht = pe.now()
        }
        function Y(e, t) {
            var n, r = 0, a = {
                height: e
            };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
                n = Be[r],
                a["margin" + n] = a["padding" + n] = e;
            return t && (a.opacity = a.width = e),
            a
        }
        function B(e, t, n) {
            for (var r, a = (I.tweeners[t] || []).concat(I.tweeners["*"]), i = 0, o = a.length; i < o; i++)
                if (r = a[i].call(n, t, e))
                    return r
        }
        function H(e, t, n) {
            var r, a, i, o, s, u, c, l, f = "width"in t || "height"in t, d = this, h = {}, p = e.style, m = e.nodeType && He(e), v = Ne.get(e, "fxshow");
            n.queue || (o = pe._queueHooks(e, "fx"),
            null == o.unqueued && (o.unqueued = 0,
            s = o.empty.fire,
            o.empty.fire = function() {
                o.unqueued || s()
            }
            ),
            o.unqueued++,
            d.always(function() {
                d.always(function() {
                    o.unqueued--,
                    pe.queue(e, "fx").length || o.empty.fire()
                })
            }));
            for (r in t)
                if (a = t[r],
                mt.test(a)) {
                    if (delete t[r],
                    i = i || "toggle" === a,
                    a === (m ? "hide" : "show")) {
                        if ("show" !== a || !v || void 0 === v[r])
                            continue;
                        m = !0
                    }
                    h[r] = v && v[r] || pe.style(e, r)
                }
            if (u = !pe.isEmptyObject(t),
            u || !pe.isEmptyObject(h)) {
                f && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                c = v && v.display,
                null == c && (c = Ne.get(e, "display")),
                l = pe.css(e, "display"),
                "none" === l && (c ? l = c : (g([e], !0),
                c = e.style.display || c,
                l = pe.css(e, "display"),
                g([e]))),
                ("inline" === l || "inline-block" === l && null != c) && "none" === pe.css(e, "float") && (u || (d.done(function() {
                    p.display = c
                }),
                null == c && (l = p.display,
                c = "none" === l ? "" : l)),
                p.display = "inline-block")),
                n.overflow && (p.overflow = "hidden",
                d.always(function() {
                    p.overflow = n.overflow[0],
                    p.overflowX = n.overflow[1],
                    p.overflowY = n.overflow[2]
                })),
                u = !1;
                for (r in h)
                    u || (v ? "hidden"in v && (m = v.hidden) : v = Ne.access(e, "fxshow", {
                        display: c
                    }),
                    i && (v.hidden = !m),
                    m && g([e], !0),
                    d.done(function() {
                        m || g([e]),
                        Ne.remove(e, "fxshow");
                        for (r in h)
                            pe.style(e, r, h[r])
                    })),
                    u = B(m ? v[r] : 0, r, d),
                    r in v || (v[r] = u.start,
                    m && (u.end = u.start,
                    u.start = 0))
            }
        }
        function F(e, t) {
            var n, r, a, i, o;
            for (n in e)
                if (r = pe.camelCase(n),
                a = t[r],
                i = e[n],
                pe.isArray(i) && (a = i[1],
                i = e[n] = i[0]),
                n !== r && (e[r] = i,
                delete e[n]),
                o = pe.cssHooks[r],
                o && "expand"in o) {
                    i = o.expand(i),
                    delete e[r];
                    for (n in i)
                        n in e || (e[n] = i[n],
                        t[n] = a)
                } else
                    t[r] = a
        }
        function I(e, t, n) {
            var r, a, i = 0, o = I.prefilters.length, s = pe.Deferred().always(function() {
                delete u.elem
            }), u = function() {
                if (a)
                    return !1;
                for (var t = ht || q(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, i = 1 - r, o = 0, u = c.tweens.length; o < u; o++)
                    c.tweens[o].run(i);
                return s.notifyWith(e, [c, i, n]),
                i < 1 && u ? n : (s.resolveWith(e, [c]),
                !1)
            }, c = s.promise({
                elem: e,
                props: pe.extend({}, t),
                opts: pe.extend(!0, {
                    specialEasing: {},
                    easing: pe.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: ht || q(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = pe.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(r),
                    r
                },
                stop: function(t) {
                    var n = 0
                      , r = t ? c.tweens.length : 0;
                    if (a)
                        return this;
                    for (a = !0; n < r; n++)
                        c.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [c, 1, 0]),
                    s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]),
                    this
                }
            }), l = c.props;
            for (F(l, c.opts.specialEasing); i < o; i++)
                if (r = I.prefilters[i].call(c, e, l, c.opts))
                    return pe.isFunction(r.stop) && (pe._queueHooks(c.elem, c.opts.queue).stop = pe.proxy(r.stop, r)),
                    r;
            return pe.map(l, B, c),
            pe.isFunction(c.opts.start) && c.opts.start.call(e, c),
            pe.fx.timer(pe.extend(u, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })),
            c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }
        function U(e) {
            var t = e.match(Oe) || [];
            return t.join(" ")
        }
        function G(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }
        function $(e, t, n, r) {
            var a;
            if (pe.isArray(t))
                pe.each(t, function(t, a) {
                    n || Tt.test(e) ? r(e, a) : $(e + "[" + ("object" == typeof a && null != a ? t : "") + "]", a, n, r)
                });
            else if (n || "object" !== pe.type(t))
                r(e, t);
            else
                for (a in t)
                    $(e + "[" + a + "]", t[a], n, r)
        }
        function V(e) {
            return function(t, n) {
                "string" != typeof t && (n = t,
                t = "*");
                var r, a = 0, i = t.toLowerCase().match(Oe) || [];
                if (pe.isFunction(n))
                    for (; r = i[a++]; )
                        "+" === r[0] ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }
        function K(e, t, n, r) {
            function a(s) {
                var u;
                return i[s] = !0,
                pe.each(e[s] || [], function(e, s) {
                    var c = s(t, n, r);
                    return "string" != typeof c || o || i[c] ? o ? !(u = c) : void 0 : (t.dataTypes.unshift(c),
                    a(c),
                    !1)
                }),
                u
            }
            var i = {}
              , o = e === Rt;
            return a(t.dataTypes[0]) || !i["*"] && a("*")
        }
        function X(e, t) {
            var n, r, a = pe.ajaxSettings.flatOptions || {};
            for (n in t)
                void 0 !== t[n] && ((a[n] ? e : r || (r = {}))[n] = t[n]);
            return r && pe.extend(!0, e, r),
            e
        }
        function J(e, t, n) {
            for (var r, a, i, o, s = e.contents, u = e.dataTypes; "*" === u[0]; )
                u.shift(),
                void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (a in s)
                    if (s[a] && s[a].test(r)) {
                        u.unshift(a);
                        break
                    }
            if (u[0]in n)
                i = u[0];
            else {
                for (a in n) {
                    if (!u[0] || e.converters[a + " " + u[0]]) {
                        i = a;
                        break
                    }
                    o || (o = a)
                }
                i = i || o
            }
            if (i)
                return i !== u[0] && u.unshift(i),
                n[i]
        }
        function Z(e, t, n, r) {
            var a, i, o, s, u, c = {}, l = e.dataTypes.slice();
            if (l[1])
                for (o in e.converters)
                    c[o.toLowerCase()] = e.converters[o];
            for (i = l.shift(); i; )
                if (e.responseFields[i] && (n[e.responseFields[i]] = t),
                !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                u = i,
                i = l.shift())
                    if ("*" === i)
                        i = u;
                    else if ("*" !== u && u !== i) {
                        if (o = c[u + " " + i] || c["* " + i],
                        !o)
                            for (a in c)
                                if (s = a.split(" "),
                                s[1] === i && (o = c[u + " " + s[0]] || c["* " + s[0]])) {
                                    o === !0 ? o = c[a] : c[a] !== !0 && (i = s[0],
                                    l.unshift(s[1]));
                                    break
                                }
                        if (o !== !0)
                            if (o && e.throws)
                                t = o(t);
                            else
                                try {
                                    t = o(t)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: o ? e : "No conversion from " + u + " to " + i
                                    }
                                }
                    }
            return {
                state: "success",
                data: t
            }
        }
        function Q(e) {
            return pe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var ee = []
          , te = e.document
          , ne = Object.getPrototypeOf
          , re = ee.slice
          , ae = ee.concat
          , ie = ee.push
          , oe = ee.indexOf
          , se = {}
          , ue = se.toString
          , ce = se.hasOwnProperty
          , le = ce.toString
          , fe = le.call(Object)
          , de = {}
          , he = "3.1.1"
          , pe = function(e, t) {
            return new pe.fn.init(e,t)
        }
          , me = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
          , ge = /^-ms-/
          , ve = /-([a-z])/g
          , ye = function(e, t) {
            return t.toUpperCase()
        };
        pe.fn = pe.prototype = {
            jquery: he,
            constructor: pe,
            length: 0,
            toArray: function() {
                return re.call(this)
            },
            get: function(e) {
                return null == e ? re.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = pe.merge(this.constructor(), e);
                return t.prevObject = this,
                t
            },
            each: function(e) {
                return pe.each(this, e)
            },
            map: function(e) {
                return this.pushStack(pe.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(re.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length
                  , n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ie,
            sort: ee.sort,
            splice: ee.splice
        },
        pe.extend = pe.fn.extend = function() {
            var e, t, n, r, a, i, o = arguments[0] || {}, s = 1, u = arguments.length, c = !1;
            for ("boolean" == typeof o && (c = o,
            o = arguments[s] || {},
            s++),
            "object" == typeof o || pe.isFunction(o) || (o = {}),
            s === u && (o = this,
            s--); s < u; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        n = o[t],
                        r = e[t],
                        o !== r && (c && r && (pe.isPlainObject(r) || (a = pe.isArray(r))) ? (a ? (a = !1,
                        i = n && pe.isArray(n) ? n : []) : i = n && pe.isPlainObject(n) ? n : {},
                        o[t] = pe.extend(c, i, r)) : void 0 !== r && (o[t] = r));
            return o
        }
        ,
        pe.extend({
            expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === pe.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                var t = pe.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            },
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== ue.call(e)) && (!(t = ne(e)) || (n = ce.call(t, "constructor") && t.constructor,
                "function" == typeof n && le.call(n) === fe))
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? se[ue.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                n(e)
            },
            camelCase: function(e) {
                return e.replace(ge, "ms-").replace(ve, ye)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t) {
                var n, a = 0;
                if (r(e))
                    for (n = e.length; a < n && t.call(e[a], a, e[a]) !== !1; a++)
                        ;
                else
                    for (a in e)
                        if (t.call(e[a], a, e[a]) === !1)
                            break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(me, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (r(Object(e)) ? pe.merge(n, "string" == typeof e ? [e] : e) : ie.call(n, e)),
                n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : oe.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, a = e.length; r < n; r++)
                    e[a++] = t[r];
                return e.length = a,
                e
            },
            grep: function(e, t, n) {
                for (var r, a = [], i = 0, o = e.length, s = !n; i < o; i++)
                    r = !t(e[i], i),
                    r !== s && a.push(e[i]);
                return a
            },
            map: function(e, t, n) {
                var a, i, o = 0, s = [];
                if (r(e))
                    for (a = e.length; o < a; o++)
                        i = t(e[o], o, n),
                        null != i && s.push(i);
                else
                    for (o in e)
                        i = t(e[o], o, n),
                        null != i && s.push(i);
                return ae.apply([], s)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, r, a;
                if ("string" == typeof t && (n = e[t],
                t = e,
                e = n),
                pe.isFunction(e))
                    return r = re.call(arguments, 2),
                    a = function() {
                        return e.apply(t || this, r.concat(re.call(arguments)))
                    }
                    ,
                    a.guid = e.guid = e.guid || pe.guid++,
                    a
            },
            now: Date.now,
            support: de
        }),
        "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ee[Symbol.iterator]),
        pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            se["[object " + t + "]"] = t.toLowerCase()
        });
        var be = function(e) {
            function t(e, t, n, r) {
                var a, i, o, s, u, c, l, d = t && t.ownerDocument, p = t ? t.nodeType : 9;
                if (n = n || [],
                "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p)
                    return n;
                if (!r && ((t ? t.ownerDocument || t : B) !== P && j(t),
                t = t || P,
                N)) {
                    if (11 !== p && (u = ve.exec(e)))
                        if (a = u[1]) {
                            if (9 === p) {
                                if (!(o = t.getElementById(a)))
                                    return n;
                                if (o.id === a)
                                    return n.push(o),
                                    n
                            } else if (d && (o = d.getElementById(a)) && q(t, o) && o.id === a)
                                return n.push(o),
                                n
                        } else {
                            if (u[2])
                                return Z.apply(n, t.getElementsByTagName(e)),
                                n;
                            if ((a = u[3]) && A.getElementsByClassName && t.getElementsByClassName)
                                return Z.apply(n, t.getElementsByClassName(a)),
                                n
                        }
                    if (A.qsa && !G[e + " "] && (!W || !W.test(e))) {
                        if (1 !== p)
                            d = t,
                            l = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(we, Ae) : t.setAttribute("id", s = Y),
                            c = T(e),
                            i = c.length; i--; )
                                c[i] = "#" + s + " " + h(c[i]);
                            l = c.join(","),
                            d = ye.test(e) && f(t.parentNode) || t
                        }
                        if (l)
                            try {
                                return Z.apply(n, d.querySelectorAll(l)),
                                n
                            } catch (e) {} finally {
                                s === Y && t.removeAttribute("id")
                            }
                    }
                }
                return E(e.replace(se, "$1"), t, n, r)
            }
            function n() {
                function e(n, r) {
                    return t.push(n + " ") > x.cacheLength && delete e[t.shift()],
                    e[n + " "] = r
                }
                var t = [];
                return e
            }
            function r(e) {
                return e[Y] = !0,
                e
            }
            function a(e) {
                var t = P.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                    t = null
                }
            }
            function i(e, t) {
                for (var n = e.split("|"), r = n.length; r--; )
                    x.attrHandle[n[r]] = t
            }
            function o(e, t) {
                var n = t && e
                  , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (r)
                    return r;
                if (n)
                    for (; n = n.nextSibling; )
                        if (n === t)
                            return -1;
                return e ? 1 : -1
            }
            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }
            function u(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }
            function c(e) {
                return function(t) {
                    return "form"in t ? t.parentNode && t.disabled === !1 ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Me(t) === e : t.disabled === e : "label"in t && t.disabled === e
                }
            }
            function l(e) {
                return r(function(t) {
                    return t = +t,
                    r(function(n, r) {
                        for (var a, i = e([], n.length, t), o = i.length; o--; )
                            n[a = i[o]] && (n[a] = !(r[a] = n[a]))
                    })
                })
            }
            function f(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }
            function d() {}
            function h(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++)
                    r += e[t].value;
                return r
            }
            function p(e, t, n) {
                var r = t.dir
                  , a = t.next
                  , i = a || r
                  , o = n && "parentNode" === i
                  , s = F++;
                return t.first ? function(t, n, a) {
                    for (; t = t[r]; )
                        if (1 === t.nodeType || o)
                            return e(t, n, a);
                    return !1
                }
                : function(t, n, u) {
                    var c, l, f, d = [H, s];
                    if (u) {
                        for (; t = t[r]; )
                            if ((1 === t.nodeType || o) && e(t, n, u))
                                return !0
                    } else
                        for (; t = t[r]; )
                            if (1 === t.nodeType || o)
                                if (f = t[Y] || (t[Y] = {}),
                                l = f[t.uniqueID] || (f[t.uniqueID] = {}),
                                a && a === t.nodeName.toLowerCase())
                                    t = t[r] || t;
                                else {
                                    if ((c = l[i]) && c[0] === H && c[1] === s)
                                        return d[2] = c[2];
                                    if (l[i] = d,
                                    d[2] = e(t, n, u))
                                        return !0
                                }
                    return !1
                }
            }
            function m(e) {
                return e.length > 1 ? function(t, n, r) {
                    for (var a = e.length; a--; )
                        if (!e[a](t, n, r))
                            return !1;
                    return !0
                }
                : e[0]
            }
            function g(e, n, r) {
                for (var a = 0, i = n.length; a < i; a++)
                    t(e, n[a], r);
                return r
            }
            function v(e, t, n, r, a) {
                for (var i, o = [], s = 0, u = e.length, c = null != t; s < u; s++)
                    (i = e[s]) && (n && !n(i, r, a) || (o.push(i),
                    c && t.push(s)));
                return o
            }
            function y(e, t, n, a, i, o) {
                return a && !a[Y] && (a = y(a)),
                i && !i[Y] && (i = y(i, o)),
                r(function(r, o, s, u) {
                    var c, l, f, d = [], h = [], p = o.length, m = r || g(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? m : v(m, d, e, s, u), b = n ? i || (r ? e : p || a) ? [] : o : y;
                    if (n && n(y, b, s, u),
                    a)
                        for (c = v(b, h),
                        a(c, [], s, u),
                        l = c.length; l--; )
                            (f = c[l]) && (b[h[l]] = !(y[h[l]] = f));
                    if (r) {
                        if (i || e) {
                            if (i) {
                                for (c = [],
                                l = b.length; l--; )
                                    (f = b[l]) && c.push(y[l] = f);
                                i(null, b = [], c, u)
                            }
                            for (l = b.length; l--; )
                                (f = b[l]) && (c = i ? ee(r, f) : d[l]) > -1 && (r[c] = !(o[c] = f))
                        }
                    } else
                        b = v(b === o ? b.splice(p, b.length) : b),
                        i ? i(null, o, b, u) : Z.apply(o, b)
                })
            }
            function b(e) {
                for (var t, n, r, a = e.length, i = x.relative[e[0].type], o = i || x.relative[" "], s = i ? 1 : 0, u = p(function(e) {
                    return e === t
                }, o, !0), c = p(function(e) {
                    return ee(t, e) > -1
                }, o, !0), l = [function(e, n, r) {
                    var a = !i && (r || n !== C) || ((t = n).nodeType ? u(e, n, r) : c(e, n, r));
                    return t = null,
                    a
                }
                ]; s < a; s++)
                    if (n = x.relative[e[s].type])
                        l = [p(m(l), n)];
                    else {
                        if (n = x.filter[e[s].type].apply(null, e[s].matches),
                        n[Y]) {
                            for (r = ++s; r < a && !x.relative[e[r].type]; r++)
                                ;
                            return y(s > 1 && m(l), s > 1 && h(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(se, "$1"), n, s < r && b(e.slice(s, r)), r < a && b(e = e.slice(r)), r < a && h(e))
                        }
                        l.push(n)
                    }
                return m(l)
            }
            function _(e, n) {
                var a = n.length > 0
                  , i = e.length > 0
                  , o = function(r, o, s, u, c) {
                    var l, f, d, h = 0, p = "0", m = r && [], g = [], y = C, b = r || i && x.find.TAG("*", c), _ = H += null == y ? 1 : Math.random() || .1, w = b.length;
                    for (c && (C = o === P || o || c); p !== w && null != (l = b[p]); p++) {
                        if (i && l) {
                            for (f = 0,
                            o || l.ownerDocument === P || (j(l),
                            s = !N); d = e[f++]; )
                                if (d(l, o || P, s)) {
                                    u.push(l);
                                    break
                                }
                            c && (H = _)
                        }
                        a && ((l = !d && l) && h--,
                        r && m.push(l))
                    }
                    if (h += p,
                    a && p !== h) {
                        for (f = 0; d = n[f++]; )
                            d(m, g, o, s);
                        if (r) {
                            if (h > 0)
                                for (; p--; )
                                    m[p] || g[p] || (g[p] = X.call(u));
                            g = v(g)
                        }
                        Z.apply(u, g),
                        c && !r && g.length > 0 && h + n.length > 1 && t.uniqueSort(u)
                    }
                    return c && (H = _,
                    C = y),
                    m
                };
                return a ? r(o) : o
            }
            var w, A, x, M, k, T, S, E, C, O, D, j, P, z, N, W, L, R, q, Y = "sizzle" + 1 * new Date, B = e.document, H = 0, F = 0, I = n(), U = n(), G = n(), $ = function(e, t) {
                return e === t && (D = !0),
                0
            }, V = {}.hasOwnProperty, K = [], X = K.pop, J = K.push, Z = K.push, Q = K.slice, ee = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t)
                        return n;
                return -1
            }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", ae = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", ie = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)", oe = new RegExp(ne + "+","g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), ue = new RegExp("^" + ne + "*," + ne + "*"), ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), le = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), fe = new RegExp(ie), de = new RegExp("^" + re + "$"), he = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re + "|[*])"),
                ATTR: new RegExp("^" + ae),
                PSEUDO: new RegExp("^" + ie),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
                bool: new RegExp("^(?:" + te + ")$","i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
            }, pe = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), _e = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Ae = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            }, xe = function() {
                j()
            }, Me = p(function(e) {
                return e.disabled === !0 && ("form"in e || "label"in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
            try {
                Z.apply(K = Q.call(B.childNodes), B.childNodes),
                K[B.childNodes.length].nodeType
            } catch (e) {
                Z = {
                    apply: K.length ? function(e, t) {
                        J.apply(e, Q.call(t))
                    }
                    : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++]; )
                            ;
                        e.length = n - 1
                    }
                }
            }
            A = t.support = {},
            k = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }
            ,
            j = t.setDocument = function(e) {
                var t, n, r = e ? e.ownerDocument || e : B;
                return r !== P && 9 === r.nodeType && r.documentElement ? (P = r,
                z = P.documentElement,
                N = !k(P),
                B !== P && (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)),
                A.attributes = a(function(e) {
                    return e.className = "i",
                    !e.getAttribute("className")
                }),
                A.getElementsByTagName = a(function(e) {
                    return e.appendChild(P.createComment("")),
                    !e.getElementsByTagName("*").length
                }),
                A.getElementsByClassName = ge.test(P.getElementsByClassName),
                A.getById = a(function(e) {
                    return z.appendChild(e).id = Y,
                    !P.getElementsByName || !P.getElementsByName(Y).length
                }),
                A.getById ? (x.filter.ID = function(e) {
                    var t = e.replace(be, _e);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }
                ,
                x.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && N) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }
                ) : (x.filter.ID = function(e) {
                    var t = e.replace(be, _e);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }
                ,
                x.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && N) {
                        var n, r, a, i = t.getElementById(e);
                        if (i) {
                            if (n = i.getAttributeNode("id"),
                            n && n.value === e)
                                return [i];
                            for (a = t.getElementsByName(e),
                            r = 0; i = a[r++]; )
                                if (n = i.getAttributeNode("id"),
                                n && n.value === e)
                                    return [i]
                        }
                        return []
                    }
                }
                ),
                x.find.TAG = A.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : A.qsa ? t.querySelectorAll(e) : void 0
                }
                : function(e, t) {
                    var n, r = [], a = 0, i = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = i[a++]; )
                            1 === n.nodeType && r.push(n);
                        return r
                    }
                    return i
                }
                ,
                x.find.CLASS = A.getElementsByClassName && function(e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && N)
                        return t.getElementsByClassName(e)
                }
                ,
                L = [],
                W = [],
                (A.qsa = ge.test(P.querySelectorAll)) && (a(function(e) {
                    z.appendChild(e).innerHTML = "<a id='" + Y + "'></a><select id='" + Y + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    e.querySelectorAll("[msallowcapture^='']").length && W.push("[*^$]=" + ne + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length || W.push("\\[" + ne + "*(?:value|" + te + ")"),
                    e.querySelectorAll("[id~=" + Y + "-]").length || W.push("~="),
                    e.querySelectorAll(":checked").length || W.push(":checked"),
                    e.querySelectorAll("a#" + Y + "+*").length || W.push(".#.+[+~]")
                }),
                a(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = P.createElement("input");
                    t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length && W.push("name" + ne + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length && W.push(":enabled", ":disabled"),
                    z.appendChild(e).disabled = !0,
                    2 !== e.querySelectorAll(":disabled").length && W.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    W.push(",.*:")
                })),
                (A.matchesSelector = ge.test(R = z.matches || z.webkitMatchesSelector || z.mozMatchesSelector || z.oMatchesSelector || z.msMatchesSelector)) && a(function(e) {
                    A.disconnectedMatch = R.call(e, "*"),
                    R.call(e, "[s!='']:x"),
                    L.push("!=", ie)
                }),
                W = W.length && new RegExp(W.join("|")),
                L = L.length && new RegExp(L.join("|")),
                t = ge.test(z.compareDocumentPosition),
                q = t || ge.test(z.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e
                      , r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                }
                : function(e, t) {
                    if (t)
                        for (; t = t.parentNode; )
                            if (t === e)
                                return !0;
                    return !1
                }
                ,
                $ = t ? function(e, t) {
                    if (e === t)
                        return D = !0,
                        0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                    1 & n || !A.sortDetached && t.compareDocumentPosition(e) === n ? e === P || e.ownerDocument === B && q(B, e) ? -1 : t === P || t.ownerDocument === B && q(B, t) ? 1 : O ? ee(O, e) - ee(O, t) : 0 : 4 & n ? -1 : 1)
                }
                : function(e, t) {
                    if (e === t)
                        return D = !0,
                        0;
                    var n, r = 0, a = e.parentNode, i = t.parentNode, s = [e], u = [t];
                    if (!a || !i)
                        return e === P ? -1 : t === P ? 1 : a ? -1 : i ? 1 : O ? ee(O, e) - ee(O, t) : 0;
                    if (a === i)
                        return o(e, t);
                    for (n = e; n = n.parentNode; )
                        s.unshift(n);
                    for (n = t; n = n.parentNode; )
                        u.unshift(n);
                    for (; s[r] === u[r]; )
                        r++;
                    return r ? o(s[r], u[r]) : s[r] === B ? -1 : u[r] === B ? 1 : 0
                }
                ,
                P) : P
            }
            ,
            t.matches = function(e, n) {
                return t(e, null, null, n)
            }
            ,
            t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== P && j(e),
                n = n.replace(le, "='$1']"),
                A.matchesSelector && N && !G[n + " "] && (!L || !L.test(n)) && (!W || !W.test(n)))
                    try {
                        var r = R.call(e, n);
                        if (r || A.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return r
                    } catch (e) {}
                return t(n, P, null, [e]).length > 0
            }
            ,
            t.contains = function(e, t) {
                return (e.ownerDocument || e) !== P && j(e),
                q(e, t)
            }
            ,
            t.attr = function(e, t) {
                (e.ownerDocument || e) !== P && j(e);
                var n = x.attrHandle[t.toLowerCase()]
                  , r = n && V.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !N) : void 0;
                return void 0 !== r ? r : A.attributes || !N ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }
            ,
            t.escape = function(e) {
                return (e + "").replace(we, Ae)
            }
            ,
            t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }
            ,
            t.uniqueSort = function(e) {
                var t, n = [], r = 0, a = 0;
                if (D = !A.detectDuplicates,
                O = !A.sortStable && e.slice(0),
                e.sort($),
                D) {
                    for (; t = e[a++]; )
                        t === e[a] && (r = n.push(a));
                    for (; r--; )
                        e.splice(n[r], 1)
                }
                return O = null,
                e
            }
            ,
            M = t.getText = function(e) {
                var t, n = "", r = 0, a = e.nodeType;
                if (a) {
                    if (1 === a || 9 === a || 11 === a) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += M(e)
                    } else if (3 === a || 4 === a)
                        return e.nodeValue
                } else
                    for (; t = e[r++]; )
                        n += M(t);
                return n
            }
            ,
            x = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: he,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(be, _e),
                        e[3] = (e[3] || e[4] || e[5] || "").replace(be, _e),
                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                        e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(),
                        "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                        e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                        e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                        e[2] = n.slice(0, t)),
                        e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(be, _e).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        }
                        : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = I[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && I(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, r) {
                        return function(a) {
                            var i = t.attr(a, e);
                            return null == i ? "!=" === n : !n || (i += "",
                            "=" === n ? i === r : "!=" === n ? i !== r : "^=" === n ? r && 0 === i.indexOf(r) : "*=" === n ? r && i.indexOf(r) > -1 : "$=" === n ? r && i.slice(-r.length) === r : "~=" === n ? (" " + i.replace(oe, " ") + " ").indexOf(r) > -1 : "|=" === n && (i === r || i.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function(e, t, n, r, a) {
                        var i = "nth" !== e.slice(0, 3)
                          , o = "last" !== e.slice(-4)
                          , s = "of-type" === t;
                        return 1 === r && 0 === a ? function(e) {
                            return !!e.parentNode
                        }
                        : function(t, n, u) {
                            var c, l, f, d, h, p, m = i !== o ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s, b = !1;
                            if (g) {
                                if (i) {
                                    for (; m; ) {
                                        for (d = t; d = d[m]; )
                                            if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)
                                                return !1;
                                        p = m = "only" === e && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [o ? g.firstChild : g.lastChild],
                                o && y) {
                                    for (d = g,
                                    f = d[Y] || (d[Y] = {}),
                                    l = f[d.uniqueID] || (f[d.uniqueID] = {}),
                                    c = l[e] || [],
                                    h = c[0] === H && c[1],
                                    b = h && c[2],
                                    d = h && g.childNodes[h]; d = ++h && d && d[m] || (b = h = 0) || p.pop(); )
                                        if (1 === d.nodeType && ++b && d === t) {
                                            l[e] = [H, h, b];
                                            break
                                        }
                                } else if (y && (d = t,
                                f = d[Y] || (d[Y] = {}),
                                l = f[d.uniqueID] || (f[d.uniqueID] = {}),
                                c = l[e] || [],
                                h = c[0] === H && c[1],
                                b = h),
                                b === !1)
                                    for (; (d = ++h && d && d[m] || (b = h = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (y && (f = d[Y] || (d[Y] = {}),
                                    l = f[d.uniqueID] || (f[d.uniqueID] = {}),
                                    l[e] = [H, b]),
                                    d !== t)); )
                                        ;
                                return b -= a,
                                b === r || b % r === 0 && b / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var a, i = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return i[Y] ? i(n) : i.length > 1 ? (a = [e, e, "", n],
                        x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                            for (var r, a = i(e, n), o = a.length; o--; )
                                r = ee(e, a[o]),
                                e[r] = !(t[r] = a[o])
                        }) : function(e) {
                            return i(e, 0, a)
                        }
                        ) : i
                    }
                },
                pseudos: {
                    not: r(function(e) {
                        var t = []
                          , n = []
                          , a = S(e.replace(se, "$1"));
                        return a[Y] ? r(function(e, t, n, r) {
                            for (var i, o = a(e, null, r, []), s = e.length; s--; )
                                (i = o[s]) && (e[s] = !(t[s] = i))
                        }) : function(e, r, i) {
                            return t[0] = e,
                            a(t, null, i, n),
                            t[0] = null,
                            !n.pop()
                        }
                    }),
                    has: r(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: r(function(e) {
                        return e = e.replace(be, _e),
                        function(t) {
                            return (t.textContent || t.innerText || M(t)).indexOf(e) > -1
                        }
                    }),
                    lang: r(function(e) {
                        return de.test(e || "") || t.error("unsupported lang: " + e),
                        e = e.replace(be, _e).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                    return n = n.toLowerCase(),
                                    n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);return !1
                        }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === z
                    },
                    focus: function(e) {
                        return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: c(!1),
                    disabled: c(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                        e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !x.pseudos.empty(e)
                    },
                    header: function(e) {
                        return me.test(e.nodeName)
                    },
                    input: function(e) {
                        return pe.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: l(function() {
                        return [0]
                    }),
                    last: l(function(e, t) {
                        return [t - 1]
                    }),
                    eq: l(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: l(function(e, t) {
                        for (var n = 0; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    odd: l(function(e, t) {
                        for (var n = 1; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    lt: l(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; --r >= 0; )
                            e.push(r);
                        return e
                    }),
                    gt: l(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t; )
                            e.push(r);
                        return e
                    })
                }
            },
            x.pseudos.nth = x.pseudos.eq;
            for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                x.pseudos[w] = s(w);
            for (w in {
                submit: !0,
                reset: !0
            })
                x.pseudos[w] = u(w);
            return d.prototype = x.filters = x.pseudos,
            x.setFilters = new d,
            T = t.tokenize = function(e, n) {
                var r, a, i, o, s, u, c, l = U[e + " "];
                if (l)
                    return n ? 0 : l.slice(0);
                for (s = e,
                u = [],
                c = x.preFilter; s; ) {
                    r && !(a = ue.exec(s)) || (a && (s = s.slice(a[0].length) || s),
                    u.push(i = [])),
                    r = !1,
                    (a = ce.exec(s)) && (r = a.shift(),
                    i.push({
                        value: r,
                        type: a[0].replace(se, " ")
                    }),
                    s = s.slice(r.length));
                    for (o in x.filter)
                        !(a = he[o].exec(s)) || c[o] && !(a = c[o](a)) || (r = a.shift(),
                        i.push({
                            value: r,
                            type: o,
                            matches: a
                        }),
                        s = s.slice(r.length));
                    if (!r)
                        break
                }
                return n ? s.length : s ? t.error(e) : U(e, u).slice(0)
            }
            ,
            S = t.compile = function(e, t) {
                var n, r = [], a = [], i = G[e + " "];
                if (!i) {
                    for (t || (t = T(e)),
                    n = t.length; n--; )
                        i = b(t[n]),
                        i[Y] ? r.push(i) : a.push(i);
                    i = G(e, _(a, r)),
                    i.selector = e
                }
                return i
            }
            ,
            E = t.select = function(e, t, n, r) {
                var a, i, o, s, u, c = "function" == typeof e && e, l = !r && T(e = c.selector || e);
                if (n = n || [],
                1 === l.length) {
                    if (i = l[0] = l[0].slice(0),
                    i.length > 2 && "ID" === (o = i[0]).type && 9 === t.nodeType && N && x.relative[i[1].type]) {
                        if (t = (x.find.ID(o.matches[0].replace(be, _e), t) || [])[0],
                        !t)
                            return n;
                        c && (t = t.parentNode),
                        e = e.slice(i.shift().value.length)
                    }
                    for (a = he.needsContext.test(e) ? 0 : i.length; a-- && (o = i[a],
                    !x.relative[s = o.type]); )
                        if ((u = x.find[s]) && (r = u(o.matches[0].replace(be, _e), ye.test(i[0].type) && f(t.parentNode) || t))) {
                            if (i.splice(a, 1),
                            e = r.length && h(i),
                            !e)
                                return Z.apply(n, r),
                                n;
                            break
                        }
                }
                return (c || S(e, l))(r, t, !N, n, !t || ye.test(e) && f(t.parentNode) || t),
                n
            }
            ,
            A.sortStable = Y.split("").sort($).join("") === Y,
            A.detectDuplicates = !!D,
            j(),
            A.sortDetached = a(function(e) {
                return 1 & e.compareDocumentPosition(P.createElement("fieldset"))
            }),
            a(function(e) {
                return e.innerHTML = "<a href='#'></a>",
                "#" === e.firstChild.getAttribute("href")
            }) || i("type|href|height|width", function(e, t, n) {
                if (!n)
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }),
            A.attributes && a(function(e) {
                return e.innerHTML = "<input/>",
                e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
            }) || i("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue
            }),
            a(function(e) {
                return null == e.getAttribute("disabled")
            }) || i(te, function(e, t, n) {
                var r;
                if (!n)
                    return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }),
            t
        }(e);
        pe.find = be,
        pe.expr = be.selectors,
        pe.expr[":"] = pe.expr.pseudos,
        pe.uniqueSort = pe.unique = be.uniqueSort,
        pe.text = be.getText,
        pe.isXMLDoc = be.isXML,
        pe.contains = be.contains,
        pe.escapeSelector = be.escape;
        var _e = function(e, t, n) {
            for (var r = [], a = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                if (1 === e.nodeType) {
                    if (a && pe(e).is(n))
                        break;
                    r.push(e)
                }
            return r
        }
          , we = function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
          , Ae = pe.expr.match.needsContext
          , xe = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
          , Me = /^.[^:#\[\.,]*$/;
        pe.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }
        ,
        pe.fn.extend({
            find: function(e) {
                var t, n, r = this.length, a = this;
                if ("string" != typeof e)
                    return this.pushStack(pe(e).filter(function() {
                        for (t = 0; t < r; t++)
                            if (pe.contains(a[t], this))
                                return !0
                    }));
                for (n = this.pushStack([]),
                t = 0; t < r; t++)
                    pe.find(e, a[t], n);
                return r > 1 ? pe.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(a(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(a(this, e || [], !0))
            },
            is: function(e) {
                return !!a(this, "string" == typeof e && Ae.test(e) ? pe(e) : e || [], !1).length
            }
        });
        var ke, Te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Se = pe.fn.init = function(e, t, n) {
            var r, a;
            if (!e)
                return this;
            if (n = n || ke,
            "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Te.exec(e),
                !r || !r[1] && t)
                    return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof pe ? t[0] : t,
                    pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : te, !0)),
                    xe.test(r[1]) && pe.isPlainObject(t))
                        for (r in t)
                            pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return a = te.getElementById(r[2]),
                a && (this[0] = a,
                this.length = 1),
                this
            }
            return e.nodeType ? (this[0] = e,
            this.length = 1,
            this) : pe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(pe) : pe.makeArray(e, this)
        }
        ;
        Se.prototype = pe.fn,
        ke = pe(te);
        var Ee = /^(?:parents|prev(?:Until|All))/
          , Ce = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        pe.fn.extend({
            has: function(e) {
                var t = pe(e, this)
                  , n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (pe.contains(this, t[e]))
                            return !0;
                })
            },
            closest: function(e, t) {
                var n, r = 0, a = this.length, i = [], o = "string" != typeof e && pe(e);
                if (!Ae.test(e))
                    for (; r < a; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                                i.push(n);
                                break
                            }
                return this.pushStack(i.length > 1 ? pe.uniqueSort(i) : i)
            },
            index: function(e) {
                return e ? "string" == typeof e ? oe.call(pe(e), this[0]) : oe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }),
        pe.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return _e(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return _e(e, "parentNode", n)
            },
            next: function(e) {
                return i(e, "nextSibling")
            },
            prev: function(e) {
                return i(e, "previousSibling")
            },
            nextAll: function(e) {
                return _e(e, "nextSibling")
            },
            prevAll: function(e) {
                return _e(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return _e(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return _e(e, "previousSibling", n)
            },
            siblings: function(e) {
                return we((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return we(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || pe.merge([], e.childNodes)
            }
        }, function(e, t) {
            pe.fn[e] = function(n, r) {
                var a = pe.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n),
                r && "string" == typeof r && (a = pe.filter(r, a)),
                this.length > 1 && (Ce[e] || pe.uniqueSort(a),
                Ee.test(e) && a.reverse()),
                this.pushStack(a)
            }
        });
        var Oe = /[^\x20\t\r\n\f]+/g;
        pe.Callbacks = function(e) {
            e = "string" == typeof e ? o(e) : pe.extend({}, e);
            var t, n, r, a, i = [], s = [], u = -1, c = function() {
                for (a = e.once,
                r = t = !0; s.length; u = -1)
                    for (n = s.shift(); ++u < i.length; )
                        i[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = i.length,
                        n = !1);
                e.memory || (n = !1),
                t = !1,
                a && (i = n ? [] : "")
            }, l = {
                add: function() {
                    return i && (n && !t && (u = i.length - 1,
                    s.push(n)),
                    function t(n) {
                        pe.each(n, function(n, r) {
                            pe.isFunction(r) ? e.unique && l.has(r) || i.push(r) : r && r.length && "string" !== pe.type(r) && t(r)
                        })
                    }(arguments),
                    n && !t && c()),
                    this
                },
                remove: function() {
                    return pe.each(arguments, function(e, t) {
                        for (var n; (n = pe.inArray(t, i, n)) > -1; )
                            i.splice(n, 1),
                            n <= u && u--
                    }),
                    this
                },
                has: function(e) {
                    return e ? pe.inArray(e, i) > -1 : i.length > 0
                },
                empty: function() {
                    return i && (i = []),
                    this
                },
                disable: function() {
                    return a = s = [],
                    i = n = "",
                    this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    return a = s = [],
                    n || t || (i = n = ""),
                    this
                },
                locked: function() {
                    return !!a
                },
                fireWith: function(e, n) {
                    return a || (n = n || [],
                    n = [e, n.slice ? n.slice() : n],
                    s.push(n),
                    t || c()),
                    this
                },
                fire: function() {
                    return l.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!r
                }
            };
            return l
        }
        ,
        pe.extend({
            Deferred: function(t) {
                var n = [["notify", "progress", pe.Callbacks("memory"), pe.Callbacks("memory"), 2], ["resolve", "done", pe.Callbacks("once memory"), pe.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", pe.Callbacks("once memory"), pe.Callbacks("once memory"), 1, "rejected"]]
                  , r = "pending"
                  , a = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments),
                        this
                    },
                    catch: function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return pe.Deferred(function(t) {
                            pe.each(n, function(n, r) {
                                var a = pe.isFunction(e[r[4]]) && e[r[4]];
                                i[r[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && pe.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, a ? [e] : arguments)
                                })
                            }),
                            e = null
                        }).promise()
                    },
                    then: function(t, r, a) {
                        function i(t, n, r, a) {
                            return function() {
                                var c = this
                                  , l = arguments
                                  , f = function() {
                                    var e, f;
                                    if (!(t < o)) {
                                        if (e = r.apply(c, l),
                                        e === n.promise())
                                            throw new TypeError("Thenable self-resolution");
                                        f = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                        pe.isFunction(f) ? a ? f.call(e, i(o, n, s, a), i(o, n, u, a)) : (o++,
                                        f.call(e, i(o, n, s, a), i(o, n, u, a), i(o, n, s, n.notifyWith))) : (r !== s && (c = void 0,
                                        l = [e]),
                                        (a || n.resolveWith)(c, l))
                                    }
                                }
                                  , d = a ? f : function() {
                                    try {
                                        f()
                                    } catch (e) {
                                        pe.Deferred.exceptionHook && pe.Deferred.exceptionHook(e, d.stackTrace),
                                        t + 1 >= o && (r !== u && (c = void 0,
                                        l = [e]),
                                        n.rejectWith(c, l))
                                    }
                                }
                                ;
                                t ? d() : (pe.Deferred.getStackHook && (d.stackTrace = pe.Deferred.getStackHook()),
                                e.setTimeout(d))
                            }
                        }
                        var o = 0;
                        return pe.Deferred(function(e) {
                            n[0][3].add(i(0, e, pe.isFunction(a) ? a : s, e.notifyWith)),
                            n[1][3].add(i(0, e, pe.isFunction(t) ? t : s)),
                            n[2][3].add(i(0, e, pe.isFunction(r) ? r : u))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? pe.extend(e, a) : a
                    }
                }
                  , i = {};
                return pe.each(n, function(e, t) {
                    var o = t[2]
                      , s = t[5];
                    a[t[1]] = o.add,
                    s && o.add(function() {
                        r = s
                    }, n[3 - e][2].disable, n[0][2].lock),
                    o.add(t[3].fire),
                    i[t[0]] = function() {
                        return i[t[0] + "With"](this === i ? void 0 : this, arguments),
                        this
                    }
                    ,
                    i[t[0] + "With"] = o.fireWith
                }),
                a.promise(i),
                t && t.call(i, i),
                i
            },
            when: function(e) {
                var t = arguments.length
                  , n = t
                  , r = Array(n)
                  , a = re.call(arguments)
                  , i = pe.Deferred()
                  , o = function(e) {
                    return function(n) {
                        r[e] = this,
                        a[e] = arguments.length > 1 ? re.call(arguments) : n,
                        --t || i.resolveWith(r, a)
                    }
                };
                if (t <= 1 && (c(e, i.done(o(n)).resolve, i.reject),
                "pending" === i.state() || pe.isFunction(a[n] && a[n].then)))
                    return i.then();
                for (; n--; )
                    c(a[n], o(n), i.reject);
                return i.promise()
            }
        });
        var De = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        pe.Deferred.exceptionHook = function(t, n) {
            e.console && e.console.warn && t && De.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
        }
        ,
        pe.readyException = function(t) {
            e.setTimeout(function() {
                throw t
            })
        }
        ;
        var je = pe.Deferred();
        pe.fn.ready = function(e) {
            return je.then(e).catch(function(e) {
                pe.readyException(e)
            }),
            this
        }
        ,
        pe.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? pe.readyWait++ : pe.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --pe.readyWait : pe.isReady) || (pe.isReady = !0,
                e !== !0 && --pe.readyWait > 0 || je.resolveWith(te, [pe]))
            }
        }),
        pe.ready.then = je.then,
        "complete" === te.readyState || "loading" !== te.readyState && !te.documentElement.doScroll ? e.setTimeout(pe.ready) : (te.addEventListener("DOMContentLoaded", l),
        e.addEventListener("load", l));
        var Pe = function(e, t, n, r, a, i, o) {
            var s = 0
              , u = e.length
              , c = null == n;
            if ("object" === pe.type(n)) {
                a = !0;
                for (s in n)
                    Pe(e, t, s, n[s], !0, i, o)
            } else if (void 0 !== r && (a = !0,
            pe.isFunction(r) || (o = !0),
            c && (o ? (t.call(e, r),
            t = null) : (c = t,
            t = function(e, t, n) {
                return c.call(pe(e), n)
            }
            )),
            t))
                for (; s < u; s++)
                    t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
            return a ? e : c ? t.call(e) : u ? t(e[0], n) : i
        }
          , ze = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
        f.uid = 1,
        f.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {},
                ze(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))),
                t
            },
            set: function(e, t, n) {
                var r, a = this.cache(e);
                if ("string" == typeof t)
                    a[pe.camelCase(t)] = n;
                else
                    for (r in t)
                        a[pe.camelCase(r)] = t[r];
                return a
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][pe.camelCase(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
                void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) {
                        pe.isArray(t) ? t = t.map(pe.camelCase) : (t = pe.camelCase(t),
                        t = t in r ? [t] : t.match(Oe) || []),
                        n = t.length;
                        for (; n--; )
                            delete r[t[n]]
                    }
                    (void 0 === t || pe.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !pe.isEmptyObject(t)
            }
        };
        var Ne = new f
          , We = new f
          , Le = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
          , Re = /[A-Z]/g;
        pe.extend({
            hasData: function(e) {
                return We.hasData(e) || Ne.hasData(e)
            },
            data: function(e, t, n) {
                return We.access(e, t, n)
            },
            removeData: function(e, t) {
                We.remove(e, t)
            },
            _data: function(e, t, n) {
                return Ne.access(e, t, n)
            },
            _removeData: function(e, t) {
                Ne.remove(e, t)
            }
        }),
        pe.fn.extend({
            data: function(e, t) {
                var n, r, a, i = this[0], o = i && i.attributes;
                if (void 0 === e) {
                    if (this.length && (a = We.get(i),
                    1 === i.nodeType && !Ne.get(i, "hasDataAttrs"))) {
                        for (n = o.length; n--; )
                            o[n] && (r = o[n].name,
                            0 === r.indexOf("data-") && (r = pe.camelCase(r.slice(5)),
                            h(i, r, a[r])));
                        Ne.set(i, "hasDataAttrs", !0)
                    }
                    return a
                }
                return "object" == typeof e ? this.each(function() {
                    We.set(this, e)
                }) : Pe(this, function(t) {
                    var n;
                    if (i && void 0 === t) {
                        if (n = We.get(i, e),
                        void 0 !== n)
                            return n;
                        if (n = h(i, e),
                        void 0 !== n)
                            return n
                    } else
                        this.each(function() {
                            We.set(this, e, t)
                        })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    We.remove(this, e)
                })
            }
        }),
        pe.extend({
            queue: function(e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                    r = Ne.get(e, t),
                    n && (!r || pe.isArray(n) ? r = Ne.access(e, t, pe.makeArray(n)) : r.push(n)),
                    r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = pe.queue(e, t)
                  , r = n.length
                  , a = n.shift()
                  , i = pe._queueHooks(e, t)
                  , o = function() {
                    pe.dequeue(e, t)
                };
                "inprogress" === a && (a = n.shift(),
                r--),
                a && ("fx" === t && n.unshift("inprogress"),
                delete i.stop,
                a.call(e, o, i)),
                !r && i && i.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Ne.get(e, n) || Ne.access(e, n, {
                    empty: pe.Callbacks("once memory").add(function() {
                        Ne.remove(e, [t + "queue", n])
                    })
                })
            }
        }),
        pe.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e,
                e = "fx",
                n--),
                arguments.length < n ? pe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = pe.queue(this, e, t);
                    pe._queueHooks(this, e),
                    "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    pe.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1, a = pe.Deferred(), i = this, o = this.length, s = function() {
                    --r || a.resolveWith(i, [i])
                };
                for ("string" != typeof e && (t = e,
                e = void 0),
                e = e || "fx"; o--; )
                    n = Ne.get(i[o], e + "queueHooks"),
                    n && n.empty && (r++,
                    n.empty.add(s));
                return s(),
                a.promise(t)
            }
        });
        var qe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
          , Ye = new RegExp("^(?:([+-])=|)(" + qe + ")([a-z%]*)$","i")
          , Be = ["Top", "Right", "Bottom", "Left"]
          , He = function(e, t) {
            return e = t || e,
            "none" === e.style.display || "" === e.style.display && pe.contains(e.ownerDocument, e) && "none" === pe.css(e, "display")
        }
          , Fe = function(e, t, n, r) {
            var a, i, o = {};
            for (i in t)
                o[i] = e.style[i],
                e.style[i] = t[i];
            a = n.apply(e, r || []);
            for (i in t)
                e.style[i] = o[i];
            return a
        }
          , Ie = {};
        pe.fn.extend({
            show: function() {
                return g(this, !0)
            },
            hide: function() {
                return g(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    He(this) ? pe(this).show() : pe(this).hide()
                })
            }
        });
        var Ue = /^(?:checkbox|radio)$/i
          , Ge = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i
          , $e = /^$|\/(?:java|ecma)script/i
          , Ve = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        Ve.optgroup = Ve.option,
        Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead,
        Ve.th = Ve.td;
        var Ke = /<|&#?\w+;/;
        !function() {
            var e = te.createDocumentFragment()
              , t = e.appendChild(te.createElement("div"))
              , n = te.createElement("input");
            n.setAttribute("type", "radio"),
            n.setAttribute("checked", "checked"),
            n.setAttribute("name", "t"),
            t.appendChild(n),
            de.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
            t.innerHTML = "<textarea>x</textarea>",
            de.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Xe = te.documentElement
          , Je = /^key/
          , Ze = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
          , Qe = /^([^.]*)(?:\.(.+)|)/;
        pe.event = {
            global: {},
            add: function(e, t, n, r, a) {
                var i, o, s, u, c, l, f, d, h, p, m, g = Ne.get(e);
                if (g)
                    for (n.handler && (i = n,
                    n = i.handler,
                    a = i.selector),
                    a && pe.find.matchesSelector(Xe, a),
                    n.guid || (n.guid = pe.guid++),
                    (u = g.events) || (u = g.events = {}),
                    (o = g.handle) || (o = g.handle = function(t) {
                        return "undefined" != typeof pe && pe.event.triggered !== t.type ? pe.event.dispatch.apply(e, arguments) : void 0
                    }
                    ),
                    t = (t || "").match(Oe) || [""],
                    c = t.length; c--; )
                        s = Qe.exec(t[c]) || [],
                        h = m = s[1],
                        p = (s[2] || "").split(".").sort(),
                        h && (f = pe.event.special[h] || {},
                        h = (a ? f.delegateType : f.bindType) || h,
                        f = pe.event.special[h] || {},
                        l = pe.extend({
                            type: h,
                            origType: m,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: a,
                            needsContext: a && pe.expr.match.needsContext.test(a),
                            namespace: p.join(".")
                        }, i),
                        (d = u[h]) || (d = u[h] = [],
                        d.delegateCount = 0,
                        f.setup && f.setup.call(e, r, p, o) !== !1 || e.addEventListener && e.addEventListener(h, o)),
                        f.add && (f.add.call(e, l),
                        l.handler.guid || (l.handler.guid = n.guid)),
                        a ? d.splice(d.delegateCount++, 0, l) : d.push(l),
                        pe.event.global[h] = !0)
            },
            remove: function(e, t, n, r, a) {
                var i, o, s, u, c, l, f, d, h, p, m, g = Ne.hasData(e) && Ne.get(e);
                if (g && (u = g.events)) {
                    for (t = (t || "").match(Oe) || [""],
                    c = t.length; c--; )
                        if (s = Qe.exec(t[c]) || [],
                        h = m = s[1],
                        p = (s[2] || "").split(".").sort(),
                        h) {
                            for (f = pe.event.special[h] || {},
                            h = (r ? f.delegateType : f.bindType) || h,
                            d = u[h] || [],
                            s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            o = i = d.length; i--; )
                                l = d[i],
                                !a && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(i, 1),
                                l.selector && d.delegateCount--,
                                f.remove && f.remove.call(e, l));
                            o && !d.length && (f.teardown && f.teardown.call(e, p, g.handle) !== !1 || pe.removeEvent(e, h, g.handle),
                            delete u[h])
                        } else
                            for (h in u)
                                pe.event.remove(e, h + t[c], n, r, !0);
                    pe.isEmptyObject(u) && Ne.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, a, i, o, s = pe.event.fix(e), u = new Array(arguments.length), c = (Ne.get(this, "events") || {})[s.type] || [], l = pe.event.special[s.type] || {};
                for (u[0] = s,
                t = 1; t < arguments.length; t++)
                    u[t] = arguments[t];
                if (s.delegateTarget = this,
                !l.preDispatch || l.preDispatch.call(this, s) !== !1) {
                    for (o = pe.event.handlers.call(this, s, c),
                    t = 0; (a = o[t++]) && !s.isPropagationStopped(); )
                        for (s.currentTarget = a.elem,
                        n = 0; (i = a.handlers[n++]) && !s.isImmediatePropagationStopped(); )
                            s.rnamespace && !s.rnamespace.test(i.namespace) || (s.handleObj = i,
                            s.data = i.data,
                            r = ((pe.event.special[i.origType] || {}).handle || i.handler).apply(a.elem, u),
                            void 0 !== r && (s.result = r) === !1 && (s.preventDefault(),
                            s.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, s),
                    s.result
                }
            },
            handlers: function(e, t) {
                var n, r, a, i, o, s = [], u = t.delegateCount, c = e.target;
                if (u && c.nodeType && !("click" === e.type && e.button >= 1))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || c.disabled !== !0)) {
                            for (i = [],
                            o = {},
                            n = 0; n < u; n++)
                                r = t[n],
                                a = r.selector + " ",
                                void 0 === o[a] && (o[a] = r.needsContext ? pe(a, this).index(c) > -1 : pe.find(a, this, null, [c]).length),
                                o[a] && i.push(r);
                            i.length && s.push({
                                elem: c,
                                handlers: i
                            })
                        }
                return c = this,
                u < t.length && s.push({
                    elem: c,
                    handlers: t.slice(u)
                }),
                s
            },
            addProp: function(e, t) {
                Object.defineProperty(pe.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: pe.isFunction(t) ? function() {
                        if (this.originalEvent)
                            return t(this.originalEvent)
                    }
                    : function() {
                        if (this.originalEvent)
                            return this.originalEvent[e]
                    }
                    ,
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[pe.expando] ? e : new pe.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== A() && this.focus)
                            return this.focus(),
                            !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === A() && this.blur)
                            return this.blur(),
                            !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && pe.nodeName(this, "input"))
                            return this.click(),
                            !1
                    },
                    _default: function(e) {
                        return pe.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        },
        pe.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }
        ,
        pe.Event = function(e, t) {
            return this instanceof pe.Event ? (e && e.type ? (this.originalEvent = e,
            this.type = e.type,
            this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? _ : w,
            this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
            this.currentTarget = e.currentTarget,
            this.relatedTarget = e.relatedTarget) : this.type = e,
            t && pe.extend(this, t),
            this.timeStamp = e && e.timeStamp || pe.now(),
            void (this[pe.expando] = !0)) : new pe.Event(e,t)
        }
        ,
        pe.Event.prototype = {
            constructor: pe.Event,
            isDefaultPrevented: w,
            isPropagationStopped: w,
            isImmediatePropagationStopped: w,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = _,
                e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = _,
                e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = _,
                e && !this.isSimulated && e.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        pe.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && Je.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ze.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, pe.event.addProp),
        pe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            pe.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this, a = e.relatedTarget, i = e.handleObj;
                    return a && (a === r || pe.contains(r, a)) || (e.type = i.origType,
                    n = i.handler.apply(this, arguments),
                    e.type = t),
                    n
                }
            }
        }),
        pe.fn.extend({
            on: function(e, t, n, r) {
                return x(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return x(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, a;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                    pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                    this;
                if ("object" == typeof e) {
                    for (a in e)
                        this.off(a, t, e[a]);
                    return this
                }
                return t !== !1 && "function" != typeof t || (n = t,
                t = void 0),
                n === !1 && (n = w),
                this.each(function() {
                    pe.event.remove(this, e, n, t)
                })
            }
        });
        var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
          , tt = /<script|<style|<link/i
          , nt = /checked\s*(?:[^=]|=\s*.checked.)/i
          , rt = /^true\/(.*)/
          , at = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        pe.extend({
            htmlPrefilter: function(e) {
                return e.replace(et, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var r, a, i, o, s = e.cloneNode(!0), u = pe.contains(e.ownerDocument, e);
                if (!(de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                    for (o = v(s),
                    i = v(e),
                    r = 0,
                    a = i.length; r < a; r++)
                        E(i[r], o[r]);
                if (t)
                    if (n)
                        for (i = i || v(e),
                        o = o || v(s),
                        r = 0,
                        a = i.length; r < a; r++)
                            S(i[r], o[r]);
                    else
                        S(e, s);
                return o = v(s, "script"),
                o.length > 0 && y(o, !u && v(e, "script")),
                s
            },
            cleanData: function(e) {
                for (var t, n, r, a = pe.event.special, i = 0; void 0 !== (n = e[i]); i++)
                    if (ze(n)) {
                        if (t = n[Ne.expando]) {
                            if (t.events)
                                for (r in t.events)
                                    a[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, t.handle);
                            n[Ne.expando] = void 0
                        }
                        n[We.expando] && (n[We.expando] = void 0)
                    }
            }
        }),
        pe.fn.extend({
            detach: function(e) {
                return O(this, e, !0)
            },
            remove: function(e) {
                return O(this, e)
            },
            text: function(e) {
                return Pe(this, function(e) {
                    return void 0 === e ? pe.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return C(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = M(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return C(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = M(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return C(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return C(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++)
                    1 === e.nodeType && (pe.cleanData(v(e, !1)),
                    e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e,
                t = null == t ? e : t,
                this.map(function() {
                    return pe.clone(this, e, t)
                })
            },
            html: function(e) {
                return Pe(this, function(e) {
                    var t = this[0] || {}
                      , n = 0
                      , r = this.length;
                    if (void 0 === e && 1 === t.nodeType)
                        return t.innerHTML;
                    if ("string" == typeof e && !tt.test(e) && !Ve[(Ge.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = pe.htmlPrefilter(e);
                        try {
                            for (; n < r; n++)
                                t = this[n] || {},
                                1 === t.nodeType && (pe.cleanData(v(t, !1)),
                                t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return C(this, arguments, function(t) {
                    var n = this.parentNode;
                    pe.inArray(this, e) < 0 && (pe.cleanData(v(this)),
                    n && n.replaceChild(t, this))
                }, e)
            }
        }),
        pe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            pe.fn[e] = function(e) {
                for (var n, r = [], a = pe(e), i = a.length - 1, o = 0; o <= i; o++)
                    n = o === i ? this : this.clone(!0),
                    pe(a[o])[t](n),
                    ie.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var it = /^margin/
          , ot = new RegExp("^(" + qe + ")(?!px)[a-z%]+$","i")
          , st = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e),
            n.getComputedStyle(t)
        };
        !function() {
            function t() {
                if (s) {
                    s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                    s.innerHTML = "",
                    Xe.appendChild(o);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top,
                    i = "2px" === t.marginLeft,
                    r = "4px" === t.width,
                    s.style.marginRight = "50%",
                    a = "4px" === t.marginRight,
                    Xe.removeChild(o),
                    s = null
                }
            }
            var n, r, a, i, o = te.createElement("div"), s = te.createElement("div");
            s.style && (s.style.backgroundClip = "content-box",
            s.cloneNode(!0).style.backgroundClip = "",
            de.clearCloneStyle = "content-box" === s.style.backgroundClip,
            o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            o.appendChild(s),
            pe.extend(de, {
                pixelPosition: function() {
                    return t(),
                    n
                },
                boxSizingReliable: function() {
                    return t(),
                    r
                },
                pixelMarginRight: function() {
                    return t(),
                    a
                },
                reliableMarginLeft: function() {
                    return t(),
                    i
                }
            }))
        }();
        var ut = /^(none|table(?!-c[ea]).+)/
          , ct = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
          , lt = {
            letterSpacing: "0",
            fontWeight: "400"
        }
          , ft = ["Webkit", "Moz", "ms"]
          , dt = te.createElement("div").style;
        pe.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = D(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var a, i, o, s = pe.camelCase(t), u = e.style;
                    return t = pe.cssProps[s] || (pe.cssProps[s] = P(s) || s),
                    o = pe.cssHooks[t] || pe.cssHooks[s],
                    void 0 === n ? o && "get"in o && void 0 !== (a = o.get(e, !1, r)) ? a : u[t] : (i = typeof n,
                    "string" === i && (a = Ye.exec(n)) && a[1] && (n = p(e, t, a),
                    i = "number"),
                    null != n && n === n && ("number" === i && (n += a && a[3] || (pe.cssNumber[s] ? "" : "px")),
                    de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"),
                    o && "set"in o && void 0 === (n = o.set(e, n, r)) || (u[t] = n)),
                    void 0)
                }
            },
            css: function(e, t, n, r) {
                var a, i, o, s = pe.camelCase(t);
                return t = pe.cssProps[s] || (pe.cssProps[s] = P(s) || s),
                o = pe.cssHooks[t] || pe.cssHooks[s],
                o && "get"in o && (a = o.get(e, !0, n)),
                void 0 === a && (a = D(e, t, r)),
                "normal" === a && t in lt && (a = lt[t]),
                "" === n || n ? (i = parseFloat(a),
                n === !0 || isFinite(i) ? i || 0 : a) : a
            }
        }),
        pe.each(["height", "width"], function(e, t) {
            pe.cssHooks[t] = {
                get: function(e, n, r) {
                    if (n)
                        return !ut.test(pe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? W(e, t, r) : Fe(e, ct, function() {
                            return W(e, t, r)
                        })
                },
                set: function(e, n, r) {
                    var a, i = r && st(e), o = r && N(e, t, r, "border-box" === pe.css(e, "boxSizing", !1, i), i);
                    return o && (a = Ye.exec(n)) && "px" !== (a[3] || "px") && (e.style[t] = n,
                    n = pe.css(e, t)),
                    z(e, n, o)
                }
            }
        }),
        pe.cssHooks.marginLeft = j(de.reliableMarginLeft, function(e, t) {
            if (t)
                return (parseFloat(D(e, "marginLeft")) || e.getBoundingClientRect().left - Fe(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
        }),
        pe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            pe.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, a = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                        a[e + Be[r] + t] = i[r] || i[r - 2] || i[0];
                    return a
                }
            },
            it.test(e) || (pe.cssHooks[e + t].set = z)
        }),
        pe.fn.extend({
            css: function(e, t) {
                return Pe(this, function(e, t, n) {
                    var r, a, i = {}, o = 0;
                    if (pe.isArray(t)) {
                        for (r = st(e),
                        a = t.length; o < a; o++)
                            i[t[o]] = pe.css(e, t[o], !1, r);
                        return i
                    }
                    return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
                }, e, t, arguments.length > 1)
            }
        }),
        pe.Tween = L,
        L.prototype = {
            constructor: L,
            init: function(e, t, n, r, a, i) {
                this.elem = e,
                this.prop = n,
                this.easing = a || pe.easing._default,
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = r,
                this.unit = i || (pe.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = L.propHooks[this.prop];
                return e && e.get ? e.get(this) : L.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = L.propHooks[this.prop];
                return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : L.propHooks._default.set(this),
                this
            }
        },
        L.prototype.init.prototype = L.prototype,
        L.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""),
                    t && "auto" !== t ? t : 0)
                },
                set: function(e) {
                    pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        },
        L.propHooks.scrollTop = L.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        pe.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        pe.fx = L.prototype.init,
        pe.fx.step = {};
        var ht, pt, mt = /^(?:toggle|show|hide)$/, gt = /queueHooks$/;
        pe.Animation = pe.extend(I, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return p(n.elem, e, Ye.exec(t), n),
                    n
                }
                ]
            },
            tweener: function(e, t) {
                pe.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.match(Oe);
                for (var n, r = 0, a = e.length; r < a; r++)
                    n = e[r],
                    I.tweeners[n] = I.tweeners[n] || [],
                    I.tweeners[n].unshift(t)
            },
            prefilters: [H],
            prefilter: function(e, t) {
                t ? I.prefilters.unshift(e) : I.prefilters.push(e)
            }
        }),
        pe.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? pe.extend({}, e) : {
                complete: n || !n && t || pe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !pe.isFunction(t) && t
            };
            return pe.fx.off || te.hidden ? r.duration = 0 : "number" != typeof r.duration && (r.duration in pe.fx.speeds ? r.duration = pe.fx.speeds[r.duration] : r.duration = pe.fx.speeds._default),
            null != r.queue && r.queue !== !0 || (r.queue = "fx"),
            r.old = r.complete,
            r.complete = function() {
                pe.isFunction(r.old) && r.old.call(this),
                r.queue && pe.dequeue(this, r.queue)
            }
            ,
            r
        }
        ,
        pe.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(He).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var a = pe.isEmptyObject(e)
                  , i = pe.speed(t, n, r)
                  , o = function() {
                    var t = I(this, pe.extend({}, e), i);
                    (a || Ne.get(this, "finish")) && t.stop(!0)
                };
                return o.finish = o,
                a || i.queue === !1 ? this.each(o) : this.queue(i.queue, o)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop,
                    t(n)
                };
                return "string" != typeof e && (n = t,
                t = e,
                e = void 0),
                t && e !== !1 && this.queue(e || "fx", []),
                this.each(function() {
                    var t = !0
                      , a = null != e && e + "queueHooks"
                      , i = pe.timers
                      , o = Ne.get(this);
                    if (a)
                        o[a] && o[a].stop && r(o[a]);
                    else
                        for (a in o)
                            o[a] && o[a].stop && gt.test(a) && r(o[a]);
                    for (a = i.length; a--; )
                        i[a].elem !== this || null != e && i[a].queue !== e || (i[a].anim.stop(n),
                        t = !1,
                        i.splice(a, 1));
                    !t && n || pe.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"),
                this.each(function() {
                    var t, n = Ne.get(this), r = n[e + "queue"], a = n[e + "queueHooks"], i = pe.timers, o = r ? r.length : 0;
                    for (n.finish = !0,
                    pe.queue(this, e, []),
                    a && a.stop && a.stop.call(this, !0),
                    t = i.length; t--; )
                        i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0),
                        i.splice(t, 1));
                    for (t = 0; t < o; t++)
                        r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }),
        pe.each(["toggle", "show", "hide"], function(e, t) {
            var n = pe.fn[t];
            pe.fn[t] = function(e, r, a) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Y(t, !0), e, r, a)
            }
        }),
        pe.each({
            slideDown: Y("show"),
            slideUp: Y("hide"),
            slideToggle: Y("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            pe.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }),
        pe.timers = [],
        pe.fx.tick = function() {
            var e, t = 0, n = pe.timers;
            for (ht = pe.now(); t < n.length; t++)
                e = n[t],
                e() || n[t] !== e || n.splice(t--, 1);
            n.length || pe.fx.stop(),
            ht = void 0
        }
        ,
        pe.fx.timer = function(e) {
            pe.timers.push(e),
            e() ? pe.fx.start() : pe.timers.pop()
        }
        ,
        pe.fx.interval = 13,
        pe.fx.start = function() {
            pt || (pt = e.requestAnimationFrame ? e.requestAnimationFrame(R) : e.setInterval(pe.fx.tick, pe.fx.interval))
        }
        ,
        pe.fx.stop = function() {
            e.cancelAnimationFrame ? e.cancelAnimationFrame(pt) : e.clearInterval(pt),
            pt = null
        }
        ,
        pe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        pe.fn.delay = function(t, n) {
            return t = pe.fx ? pe.fx.speeds[t] || t : t,
            n = n || "fx",
            this.queue(n, function(n, r) {
                var a = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(a)
                }
            })
        }
        ,
        function() {
            var e = te.createElement("input")
              , t = te.createElement("select")
              , n = t.appendChild(te.createElement("option"));
            e.type = "checkbox",
            de.checkOn = "" !== e.value,
            de.optSelected = n.selected,
            e = te.createElement("input"),
            e.value = "t",
            e.type = "radio",
            de.radioValue = "t" === e.value
        }();
        var vt, yt = pe.expr.attrHandle;
        pe.fn.extend({
            attr: function(e, t) {
                return Pe(this, pe.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    pe.removeAttr(this, e)
                })
            }
        }),
        pe.extend({
            attr: function(e, t, n) {
                var r, a, i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                    return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === i && pe.isXMLDoc(e) || (a = pe.attrHooks[t.toLowerCase()] || (pe.expr.match.bool.test(t) ? vt : void 0)),
                    void 0 !== n ? null === n ? void pe.removeAttr(e, t) : a && "set"in a && void 0 !== (r = a.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                    n) : a && "get"in a && null !== (r = a.get(e, t)) ? r : (r = pe.find.attr(e, t),
                    null == r ? void 0 : r))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!de.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                            n && (e.value = n),
                            t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0, a = t && t.match(Oe);
                if (a && 1 === e.nodeType)
                    for (; n = a[r++]; )
                        e.removeAttribute(n)
            }
        }),
        vt = {
            set: function(e, t, n) {
                return t === !1 ? pe.removeAttr(e, n) : e.setAttribute(n, n),
                n
            }
        },
        pe.each(pe.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = yt[t] || pe.find.attr;
            yt[t] = function(e, t, r) {
                var a, i, o = t.toLowerCase();
                return r || (i = yt[o],
                yt[o] = a,
                a = null != n(e, t, r) ? o : null,
                yt[o] = i),
                a
            }
        });
        var bt = /^(?:input|select|textarea|button)$/i
          , _t = /^(?:a|area)$/i;
        pe.fn.extend({
            prop: function(e, t) {
                return Pe(this, pe.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[pe.propFix[e] || e]
                })
            }
        }),
        pe.extend({
            prop: function(e, t, n) {
                var r, a, i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                    return 1 === i && pe.isXMLDoc(e) || (t = pe.propFix[t] || t,
                    a = pe.propHooks[t]),
                    void 0 !== n ? a && "set"in a && void 0 !== (r = a.set(e, n, t)) ? r : e[t] = n : a && "get"in a && null !== (r = a.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = pe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : bt.test(e.nodeName) || _t.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        de.optSelected || (pe.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex,
                null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            pe.propFix[this.toLowerCase()] = this
        }),
        pe.fn.extend({
            addClass: function(e) {
                var t, n, r, a, i, o, s, u = 0;
                if (pe.isFunction(e))
                    return this.each(function(t) {
                        pe(this).addClass(e.call(this, t, G(this)))
                    });
                if ("string" == typeof e && e)
                    for (t = e.match(Oe) || []; n = this[u++]; )
                        if (a = G(n),
                        r = 1 === n.nodeType && " " + U(a) + " ") {
                            for (o = 0; i = t[o++]; )
                                r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            s = U(r),
                            a !== s && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, r, a, i, o, s, u = 0;
                if (pe.isFunction(e))
                    return this.each(function(t) {
                        pe(this).removeClass(e.call(this, t, G(this)))
                    });
                if (!arguments.length)
                    return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(Oe) || []; n = this[u++]; )
                        if (a = G(n),
                        r = 1 === n.nodeType && " " + U(a) + " ") {
                            for (o = 0; i = t[o++]; )
                                for (; r.indexOf(" " + i + " ") > -1; )
                                    r = r.replace(" " + i + " ", " ");
                            s = U(r),
                            a !== s && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each(function(n) {
                    pe(this).toggleClass(e.call(this, n, G(this), t), t)
                }) : this.each(function() {
                    var t, r, a, i;
                    if ("string" === n)
                        for (r = 0,
                        a = pe(this),
                        i = e.match(Oe) || []; t = i[r++]; )
                            a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                    else
                        void 0 !== e && "boolean" !== n || (t = G(this),
                        t && Ne.set(this, "__className__", t),
                        this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ne.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++]; )
                    if (1 === n.nodeType && (" " + U(G(n)) + " ").indexOf(t) > -1)
                        return !0;
                return !1
            }
        });
        var wt = /\r/g;
        pe.fn.extend({
            val: function(e) {
                var t, n, r, a = this[0];
                {
                    if (arguments.length)
                        return r = pe.isFunction(e),
                        this.each(function(n) {
                            var a;
                            1 === this.nodeType && (a = r ? e.call(this, n, pe(this).val()) : e,
                            null == a ? a = "" : "number" == typeof a ? a += "" : pe.isArray(a) && (a = pe.map(a, function(e) {
                                return null == e ? "" : e + ""
                            })),
                            t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()],
                            t && "set"in t && void 0 !== t.set(this, a, "value") || (this.value = a))
                        });
                    if (a)
                        return t = pe.valHooks[a.type] || pe.valHooks[a.nodeName.toLowerCase()],
                        t && "get"in t && void 0 !== (n = t.get(a, "value")) ? n : (n = a.value,
                        "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)
                }
            }
        }),
        pe.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = pe.find.attr(e, "value");
                        return null != t ? t : U(pe.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, a = e.options, i = e.selectedIndex, o = "select-one" === e.type, s = o ? null : [], u = o ? i + 1 : a.length;
                        for (r = i < 0 ? u : o ? i : 0; r < u; r++)
                            if (n = a[r],
                            (n.selected || r === i) && !n.disabled && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = pe(n).val(),
                                o)
                                    return t;
                                s.push(t)
                            }
                        return s
                    },
                    set: function(e, t) {
                        for (var n, r, a = e.options, i = pe.makeArray(t), o = a.length; o--; )
                            r = a[o],
                            (r.selected = pe.inArray(pe.valHooks.option.get(r), i) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1),
                        i
                    }
                }
            }
        }),
        pe.each(["radio", "checkbox"], function() {
            pe.valHooks[this] = {
                set: function(e, t) {
                    if (pe.isArray(t))
                        return e.checked = pe.inArray(pe(e).val(), t) > -1
                }
            },
            de.checkOn || (pe.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
            )
        });
        var At = /^(?:focusinfocus|focusoutblur)$/;
        pe.extend(pe.event, {
            trigger: function(t, n, r, a) {
                var i, o, s, u, c, l, f, d = [r || te], h = ce.call(t, "type") ? t.type : t, p = ce.call(t, "namespace") ? t.namespace.split(".") : [];
                if (o = s = r = r || te,
                3 !== r.nodeType && 8 !== r.nodeType && !At.test(h + pe.event.triggered) && (h.indexOf(".") > -1 && (p = h.split("."),
                h = p.shift(),
                p.sort()),
                c = h.indexOf(":") < 0 && "on" + h,
                t = t[pe.expando] ? t : new pe.Event(h,"object" == typeof t && t),
                t.isTrigger = a ? 2 : 3,
                t.namespace = p.join("."),
                t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                t.result = void 0,
                t.target || (t.target = r),
                n = null == n ? [t] : pe.makeArray(n, [t]),
                f = pe.event.special[h] || {},
                a || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                    if (!a && !f.noBubble && !pe.isWindow(r)) {
                        for (u = f.delegateType || h,
                        At.test(u + h) || (o = o.parentNode); o; o = o.parentNode)
                            d.push(o),
                            s = o;
                        s === (r.ownerDocument || te) && d.push(s.defaultView || s.parentWindow || e)
                    }
                    for (i = 0; (o = d[i++]) && !t.isPropagationStopped(); )
                        t.type = i > 1 ? u : f.bindType || h,
                        l = (Ne.get(o, "events") || {})[t.type] && Ne.get(o, "handle"),
                        l && l.apply(o, n),
                        l = c && o[c],
                        l && l.apply && ze(o) && (t.result = l.apply(o, n),
                        t.result === !1 && t.preventDefault());
                    return t.type = h,
                    a || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !ze(r) || c && pe.isFunction(r[h]) && !pe.isWindow(r) && (s = r[c],
                    s && (r[c] = null),
                    pe.event.triggered = h,
                    r[h](),
                    pe.event.triggered = void 0,
                    s && (r[c] = s)),
                    t.result
                }
            },
            simulate: function(e, t, n) {
                var r = pe.extend(new pe.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                pe.event.trigger(r, null, t)
            }
        }),
        pe.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    pe.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n)
                    return pe.event.trigger(e, t, n, !0)
            }
        }),
        pe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            pe.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }),
        pe.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        de.focusin = "onfocusin"in e,
        de.focusin || pe.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                pe.event.simulate(t, e.target, pe.event.fix(e))
            };
            pe.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this
                      , a = Ne.access(r, t);
                    a || r.addEventListener(e, n, !0),
                    Ne.access(r, t, (a || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this
                      , a = Ne.access(r, t) - 1;
                    a ? Ne.access(r, t, a) : (r.removeEventListener(e, n, !0),
                    Ne.remove(r, t))
                }
            }
        });
        var xt = e.location
          , Mt = pe.now()
          , kt = /\?/;
        pe.parseXML = function(t) {
            var n;
            if (!t || "string" != typeof t)
                return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t),
            n
        }
        ;
        var Tt = /\[\]$/
          , St = /\r?\n/g
          , Et = /^(?:submit|button|image|reset|file)$/i
          , Ct = /^(?:input|select|textarea|keygen)/i;
        pe.param = function(e, t) {
            var n, r = [], a = function(e, t) {
                var n = pe.isFunction(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
            if (pe.isArray(e) || e.jquery && !pe.isPlainObject(e))
                pe.each(e, function() {
                    a(this.name, this.value)
                });
            else
                for (n in e)
                    $(n, e[n], t, a);
            return r.join("&")
        }
        ,
        pe.fn.extend({
            serialize: function() {
                return pe.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = pe.prop(this, "elements");
                    return e ? pe.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !pe(this).is(":disabled") && Ct.test(this.nodeName) && !Et.test(e) && (this.checked || !Ue.test(e))
                }).map(function(e, t) {
                    var n = pe(this).val();
                    return null == n ? null : pe.isArray(n) ? pe.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(St, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(St, "\r\n")
                    }
                }).get()
            }
        });
        var Ot = /%20/g
          , Dt = /#.*$/
          , jt = /([?&])_=[^&]*/
          , Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm
          , zt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
          , Nt = /^(?:GET|HEAD)$/
          , Wt = /^\/\//
          , Lt = {}
          , Rt = {}
          , qt = "*/".concat("*")
          , Yt = te.createElement("a");
        Yt.href = xt.href,
        pe.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: xt.href,
                type: "GET",
                isLocal: zt.test(xt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": qt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": pe.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? X(X(e, pe.ajaxSettings), t) : X(pe.ajaxSettings, e)
            },
            ajaxPrefilter: V(Lt),
            ajaxTransport: V(Rt),
            ajax: function(t, n) {
                function r(t, n, r, s) {
                    var c, d, h, _, w, A = n;
                    l || (l = !0,
                    u && e.clearTimeout(u),
                    a = void 0,
                    o = s || "",
                    x.readyState = t > 0 ? 4 : 0,
                    c = t >= 200 && t < 300 || 304 === t,
                    r && (_ = J(p, x, r)),
                    _ = Z(p, _, x, c),
                    c ? (p.ifModified && (w = x.getResponseHeader("Last-Modified"),
                    w && (pe.lastModified[i] = w),
                    w = x.getResponseHeader("etag"),
                    w && (pe.etag[i] = w)),
                    204 === t || "HEAD" === p.type ? A = "nocontent" : 304 === t ? A = "notmodified" : (A = _.state,
                    d = _.data,
                    h = _.error,
                    c = !h)) : (h = A,
                    !t && A || (A = "error",
                    t < 0 && (t = 0))),
                    x.status = t,
                    x.statusText = (n || A) + "",
                    c ? v.resolveWith(m, [d, A, x]) : v.rejectWith(m, [x, A, h]),
                    x.statusCode(b),
                    b = void 0,
                    f && g.trigger(c ? "ajaxSuccess" : "ajaxError", [x, p, c ? d : h]),
                    y.fireWith(m, [x, A]),
                    f && (g.trigger("ajaxComplete", [x, p]),
                    --pe.active || pe.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t,
                t = void 0),
                n = n || {};
                var a, i, o, s, u, c, l, f, d, h, p = pe.ajaxSetup({}, n), m = p.context || p, g = p.context && (m.nodeType || m.jquery) ? pe(m) : pe.event, v = pe.Deferred(), y = pe.Callbacks("once memory"), b = p.statusCode || {}, _ = {}, w = {}, A = "canceled", x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (l) {
                            if (!s)
                                for (s = {}; t = Pt.exec(o); )
                                    s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return l ? o : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == l && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e,
                        _[e] = t),
                        this
                    },
                    overrideMimeType: function(e) {
                        return null == l && (p.mimeType = e),
                        this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (l)
                                x.always(e[x.status]);
                            else
                                for (t in e)
                                    b[t] = [b[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || A;
                        return a && a.abort(t),
                        r(0, t),
                        this
                    }
                };
                if (v.promise(x),
                p.url = ((t || p.url || xt.href) + "").replace(Wt, xt.protocol + "//"),
                p.type = n.method || n.type || p.method || p.type,
                p.dataTypes = (p.dataType || "*").toLowerCase().match(Oe) || [""],
                null == p.crossDomain) {
                    c = te.createElement("a");
                    try {
                        c.href = p.url,
                        c.href = c.href,
                        p.crossDomain = Yt.protocol + "//" + Yt.host != c.protocol + "//" + c.host
                    } catch (e) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = pe.param(p.data, p.traditional)),
                K(Lt, p, n, x),
                l)
                    return x;
                f = pe.event && p.global,
                f && 0 === pe.active++ && pe.event.trigger("ajaxStart"),
                p.type = p.type.toUpperCase(),
                p.hasContent = !Nt.test(p.type),
                i = p.url.replace(Dt, ""),
                p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Ot, "+")) : (h = p.url.slice(i.length),
                p.data && (i += (kt.test(i) ? "&" : "?") + p.data,
                delete p.data),
                p.cache === !1 && (i = i.replace(jt, "$1"),
                h = (kt.test(i) ? "&" : "?") + "_=" + Mt++ + h),
                p.url = i + h),
                p.ifModified && (pe.lastModified[i] && x.setRequestHeader("If-Modified-Since", pe.lastModified[i]),
                pe.etag[i] && x.setRequestHeader("If-None-Match", pe.etag[i])),
                (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType),
                x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + qt + "; q=0.01" : "") : p.accepts["*"]);
                for (d in p.headers)
                    x.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (p.beforeSend.call(m, x, p) === !1 || l))
                    return x.abort();
                if (A = "abort",
                y.add(p.complete),
                x.done(p.success),
                x.fail(p.error),
                a = K(Rt, p, n, x)) {
                    if (x.readyState = 1,
                    f && g.trigger("ajaxSend", [x, p]),
                    l)
                        return x;
                    p.async && p.timeout > 0 && (u = e.setTimeout(function() {
                        x.abort("timeout")
                    }, p.timeout));
                    try {
                        l = !1,
                        a.send(_, r)
                    } catch (e) {
                        if (l)
                            throw e;
                        r(-1, e)
                    }
                } else
                    r(-1, "No Transport");
                return x
            },
            getJSON: function(e, t, n) {
                return pe.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return pe.get(e, void 0, t, "script")
            }
        }),
        pe.each(["get", "post"], function(e, t) {
            pe[t] = function(e, n, r, a) {
                return pe.isFunction(n) && (a = a || r,
                r = n,
                n = void 0),
                pe.ajax(pe.extend({
                    url: e,
                    type: t,
                    dataType: a,
                    data: n,
                    success: r
                }, pe.isPlainObject(e) && e))
            }
        }),
        pe._evalUrl = function(e) {
            return pe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }
        ,
        pe.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (pe.isFunction(e) && (e = e.call(this[0])),
                t = pe(e, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstElementChild; )
                        e = e.firstElementChild;
                    return e
                }).append(this)),
                this
            },
            wrapInner: function(e) {
                return pe.isFunction(e) ? this.each(function(t) {
                    pe(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = pe(this)
                      , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = pe.isFunction(e);
                return this.each(function(n) {
                    pe(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    pe(this).replaceWith(this.childNodes)
                }),
                this
            }
        }),
        pe.expr.pseudos.hidden = function(e) {
            return !pe.expr.pseudos.visible(e)
        }
        ,
        pe.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
        ,
        pe.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch (e) {}
        }
        ;
        var Bt = {
            0: 200,
            1223: 204
        }
          , Ht = pe.ajaxSettings.xhr();
        de.cors = !!Ht && "withCredentials"in Ht,
        de.ajax = Ht = !!Ht,
        pe.ajaxTransport(function(t) {
            var n, r;
            if (de.cors || Ht && !t.crossDomain)
                return {
                    send: function(a, i) {
                        var o, s = t.xhr();
                        if (s.open(t.type, t.url, t.async, t.username, t.password),
                        t.xhrFields)
                            for (o in t.xhrFields)
                                s[o] = t.xhrFields[o];
                        t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                        t.crossDomain || a["X-Requested-With"] || (a["X-Requested-With"] = "XMLHttpRequest");
                        for (o in a)
                            s.setRequestHeader(o, a[o]);
                        n = function(e) {
                            return function() {
                                n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null,
                                "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(Bt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()))
                            }
                        }
                        ,
                        s.onload = n(),
                        r = s.onerror = n("error"),
                        void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                            4 === s.readyState && e.setTimeout(function() {
                                n && r()
                            })
                        }
                        ,
                        n = n("abort");
                        try {
                            s.send(t.hasContent && t.data || null)
                        } catch (e) {
                            if (n)
                                throw e
                        }
                    },
                    abort: function() {
                        n && n()
                    }
                }
        }),
        pe.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }),
        pe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return pe.globalEval(e),
                    e
                }
            }
        }),
        pe.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1),
            e.crossDomain && (e.type = "GET")
        }),
        pe.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(r, a) {
                        t = pe("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(),
                            n = null,
                            e && a("error" === e.type ? 404 : 200, e.type)
                        }
                        ),
                        te.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var Ft = []
          , It = /(=)\?(?=&|$)|\?\?/;
        pe.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Ft.pop() || pe.expando + "_" + Mt++;
                return this[e] = !0,
                e
            }
        }),
        pe.ajaxPrefilter("json jsonp", function(t, n, r) {
            var a, i, o, s = t.jsonp !== !1 && (It.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && It.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0])
                return a = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                s ? t[s] = t[s].replace(It, "$1" + a) : t.jsonp !== !1 && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + a),
                t.converters["script json"] = function() {
                    return o || pe.error(a + " was not called"),
                    o[0]
                }
                ,
                t.dataTypes[0] = "json",
                i = e[a],
                e[a] = function() {
                    o = arguments
                }
                ,
                r.always(function() {
                    void 0 === i ? pe(e).removeProp(a) : e[a] = i,
                    t[a] && (t.jsonpCallback = n.jsonpCallback,
                    Ft.push(a)),
                    o && pe.isFunction(i) && i(o[0]),
                    o = i = void 0
                }),
                "script"
        }),
        de.createHTMLDocument = function() {
            var e = te.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>",
            2 === e.childNodes.length
        }(),
        pe.parseHTML = function(e, t, n) {
            if ("string" != typeof e)
                return [];
            "boolean" == typeof t && (n = t,
            t = !1);
            var r, a, i;
            return t || (de.createHTMLDocument ? (t = te.implementation.createHTMLDocument(""),
            r = t.createElement("base"),
            r.href = te.location.href,
            t.head.appendChild(r)) : t = te),
            a = xe.exec(e),
            i = !n && [],
            a ? [t.createElement(a[1])] : (a = b([e], t, i),
            i && i.length && pe(i).remove(),
            pe.merge([], a.childNodes))
        }
        ,
        pe.fn.load = function(e, t, n) {
            var r, a, i, o = this, s = e.indexOf(" ");
            return s > -1 && (r = U(e.slice(s)),
            e = e.slice(0, s)),
            pe.isFunction(t) ? (n = t,
            t = void 0) : t && "object" == typeof t && (a = "POST"),
            o.length > 0 && pe.ajax({
                url: e,
                type: a || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                i = arguments,
                o.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
            }).always(n && function(e, t) {
                o.each(function() {
                    n.apply(this, i || [e.responseText, t, e])
                })
            }
            ),
            this
        }
        ,
        pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            pe.fn[t] = function(e) {
                return this.on(t, e)
            }
        }),
        pe.expr.pseudos.animated = function(e) {
            return pe.grep(pe.timers, function(t) {
                return e === t.elem
            }).length
        }
        ,
        pe.offset = {
            setOffset: function(e, t, n) {
                var r, a, i, o, s, u, c, l = pe.css(e, "position"), f = pe(e), d = {};
                "static" === l && (e.style.position = "relative"),
                s = f.offset(),
                i = pe.css(e, "top"),
                u = pe.css(e, "left"),
                c = ("absolute" === l || "fixed" === l) && (i + u).indexOf("auto") > -1,
                c ? (r = f.position(),
                o = r.top,
                a = r.left) : (o = parseFloat(i) || 0,
                a = parseFloat(u) || 0),
                pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))),
                null != t.top && (d.top = t.top - s.top + o),
                null != t.left && (d.left = t.left - s.left + a),
                "using"in t ? t.using.call(e, d) : f.css(d)
            }
        },
        pe.fn.extend({
            offset: function(e) {
                if (arguments.length)
                    return void 0 === e ? this : this.each(function(t) {
                        pe.offset.setOffset(this, e, t)
                    });
                var t, n, r, a, i = this[0];
                if (i)
                    return i.getClientRects().length ? (r = i.getBoundingClientRect(),
                    r.width || r.height ? (a = i.ownerDocument,
                    n = Q(a),
                    t = a.documentElement,
                    {
                        top: r.top + n.pageYOffset - t.clientTop,
                        left: r.left + n.pageXOffset - t.clientLeft
                    }) : r) : {
                        top: 0,
                        left: 0
                    }
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0], r = {
                        top: 0,
                        left: 0
                    };
                    return "fixed" === pe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(),
                    t = this.offset(),
                    pe.nodeName(e[0], "html") || (r = e.offset()),
                    r = {
                        top: r.top + pe.css(e[0], "borderTopWidth", !0),
                        left: r.left + pe.css(e[0], "borderLeftWidth", !0)
                    }),
                    {
                        top: t.top - r.top - pe.css(n, "marginTop", !0),
                        left: t.left - r.left - pe.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === pe.css(e, "position"); )
                        e = e.offsetParent;
                    return e || Xe
                })
            }
        }),
        pe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            pe.fn[e] = function(r) {
                return Pe(this, function(e, r, a) {
                    var i = Q(e);
                    return void 0 === a ? i ? i[t] : e[r] : void (i ? i.scrollTo(n ? i.pageXOffset : a, n ? a : i.pageYOffset) : e[r] = a)
                }, e, r, arguments.length)
            }
        }),
        pe.each(["top", "left"], function(e, t) {
            pe.cssHooks[t] = j(de.pixelPosition, function(e, n) {
                if (n)
                    return n = D(e, t),
                    ot.test(n) ? pe(e).position()[t] + "px" : n
            })
        }),
        pe.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            pe.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                pe.fn[r] = function(a, i) {
                    var o = arguments.length && (n || "boolean" != typeof a)
                      , s = n || (a === !0 || i === !0 ? "margin" : "border");
                    return Pe(this, function(t, n, a) {
                        var i;
                        return pe.isWindow(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                        Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === a ? pe.css(t, n, s) : pe.style(t, n, a, s)
                    }, t, o ? a : void 0, o)
                }
            })
        }),
        pe.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }),
        pe.parseJSON = JSON.parse,
        "function" == typeof define && define.amd && define("jquery", [], function() {
            return pe
        });
        var Ut = e.jQuery
          , Gt = e.$;
        return pe.noConflict = function(t) {
            return e.$ === pe && (e.$ = Gt),
            t && e.jQuery === pe && (e.jQuery = Ut),
            pe
        }
        ,
        t || (e.jQuery = e.$ = pe),
        pe
    })
})
  , Fs = "mercury-parsing-container";
Hs.noConflict();
var Is = function(e, t, n) {
    var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
    return r && (t && "string" == typeof t ? t = "." + Fs + " " + t : t || (t = "." + Fs)),
    new Hs.fn.init(e,t,n)
};
Is.fn = Is.prototype = Hs.fn,
Hs.extend(Is, Hs);
var Us = function(e) {
    return e.find('script, style, link[rel="stylesheet"]').remove(),
    e
};
Is.cloneHtml = function() {
    var e = Us(Is("html", null, null, !1).clone());
    return e.children().wrap("<div />").wrap("<div />")
}
,
Is.root = function() {
    return Is("*").first()
}
,
Is.browser = !0;
var Gs = function(e) {
    var t = e.get(0);
    return !(!t || !t.tagName) && "container" === t.tagName.toLowerCase()
};
Is.html = function(e) {
    if (e)
        return Gs(e) || Gs(e.children("container")) ? e.children("container").html() || e.html() : Is("<div>").append(e.eq(0).clone()).html();
    var t = Us(Is("body", null, null, !1).clone())
      , n = Us(Is("head", null, null, !1).clone())
      , r = t.find("." + Fs);
    if (r.length > 0)
        return r.children().html();
    var a = Is("<container />").append(Is("<container>" + n.html() + "</container>")).append(Is("<container>" + t.html() + "</container>")).wrap("<container />").parent().html();
    return a
}
,
Is.cleanup = function() {
    Is("." + Fs, null, null, !1).remove()
}
,
Is.load = function(e) {
    var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    arguments.length > 2 && void 0 !== arguments[2] && arguments[2]);
    e = e ? Is("<container />").html(e) : Is.cloneHtml();
    var n = Is("body", null, null, !1)
      , r = n.find("." + Fs);
    return r[0] || (n.append('<div class="' + Fs + '" style="display: none;" />'),
    r = n.find("." + Fs)),
    e = Us(e),
    e.find("*").contents().each(function() {
        this.nodeType === Node.COMMENT_NODE && Is(this).remove()
    }),
    r.html(e),
    t ? {
        $: Is,
        html: e.html()
    } : Is
}
;
var $s = {
    encodingExists: function() {
        return !1
    },
    decode: function(e) {
        return e
    }
}
  , Vs = /\s{2,}/g
  , Ks = new RegExp("(page|paging|(p(a|g|ag)?(e|enum|ewanted|ing|ination)))?(=|/)([0-9]{1,3})","i")
  , Xs = /[a-z]/i
  , Js = /^[a-z]+$/i
  , Zs = /^[0-9]+$/i
  , Qs = /charset=([\w-]+)\b/
  , eu = "utf-8"
  , tu = ji
  , nu = ja("iterator")
  , ru = ya
  , au = Sn.isIterable = function(e) {
    var t = Object(e);
    return void 0 !== t[nu] || "@@iterator"in t || ru.hasOwnProperty(tu(t))
}
  , iu = au
  , ou = n(function(e) {
    e.exports = {
        default: iu,
        __esModule: !0
    }
})
  , su = Pn
  , uu = Fi
  , cu = Sn.getIterator = function(e) {
    var t = uu(e);
    if ("function" != typeof t)
        throw TypeError(e + " is not iterable!");
    return su(t.call(e))
}
  , lu = cu
  , fu = n(function(e) {
    e.exports = {
        default: lu,
        __esModule: !0
    }
})
  , du = t(fu)
  , hu = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = ou
      , a = n(r)
      , i = fu
      , o = n(i);
    t.default = function() {
        function e(e, t) {
            var n = []
              , r = !0
              , a = !1
              , i = void 0;
            try {
                for (var s, u = (0,
                o.default)(e); !(r = (s = u.next()).done) && (n.push(s.value),
                !t || n.length !== t); r = !0)
                    ;
            } catch (e) {
                a = !0,
                i = e
            } finally {
                try {
                    !r && u.return && u.return()
                } finally {
                    if (a)
                        throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t))
                return t;
            if ((0,
            a.default)(Object(t)))
                return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
})
  , pu = t(hu)
  , mu = new RegExp(".( |$)")
  , gu = function(e) {
    function t() {
        var t = e.indexOf("\r\n", r)
          , a = e.indexOf("\n", r)
          , i = e.indexOf("\r", r)
          , o = [t, a, i]
          , s = o.sort(function(e, t) {
            return e > t ? 1 : e < t ? -1 : 0
        }).filter(function(e) {
            return e !== -1
        })[0];
        if (void 0 !== s)
            return n(s, s === t ? 2 : 1);
        var u = e.length;
        return u === r ? null : n(u, 0)
    }
    function n(t, n) {
        var a = e.substr(r, t - r);
        return r = t + n,
        a
    }
    var r = 0;
    return e = e.toString(),
    t
}
  , vu = gu
  , yu = /^[A-Z_]+(\/\d\.\d)? /
  , bu = /^([A-Z_]+) (.+) [A-Z]+\/(\d)\.(\d)$/
  , _u = /^[A-Z]+\/(\d)\.(\d) (\d{3}) (.*)$/
  , wu = function(e, t) {
    return P(N(e), t)
}
  , Au = wu
  , xu = XMLHttpRequest;
if (!xu)
    throw new Error("missing XMLHttpRequest");
R.log = {
    trace: Y,
    debug: Y,
    info: Y,
    warn: Y,
    error: Y
};
var Mu = 18e4
  , ku = 0;
R.withCredentials = !1,
R.DEFAULT_TIMEOUT = Mu,
R.defaults = function(e, t) {
    var n = function(t) {
        var n = function(n, r) {
            n = "string" == typeof n ? {
                uri: n
            } : JSON.parse(JSON.stringify(n));
            for (var a in e)
                void 0 === n[a] && (n[a] = e[a]);
            return t(n, r)
        };
        return n
    }
      , r = n(R);
    return r.get = n(R.get),
    r.post = n(R.post),
    r.put = n(R.put),
    r.head = n(R.head),
    r
}
;
var Tu = ["get", "put", "post", "head"];
Tu.forEach(function(e) {
    var t = e.toUpperCase()
      , n = e.toLowerCase();
    R[n] = function(e) {
        "string" == typeof e ? e = {
            method: t,
            uri: e
        } : (e = JSON.parse(JSON.stringify(e)),
        e.method = t);
        var n = [e].concat(Array.prototype.slice.apply(arguments, [1]));
        return R.apply(this, n)
    }
}),
R.couch = function(e, t) {
    function n(e, n, r) {
        if (e)
            return t(e, n, r);
        if ((n.statusCode < 200 || n.statusCode > 299) && r.error) {
            e = new Error("CouchDB error: " + (r.error.reason || r.error.error));
            for (var a in r)
                e[a] = r[a];
            return t(e, n, r)
        }
        return t(e, n, r)
    }
    "string" == typeof e && (e = {
        uri: e
    }),
    e.json = !0,
    e.body && (e.json = e.body),
    delete e.body,
    t = t || Y;
    var r = R(e, n);
    return r
}
;
var Su = R
  , Eu = [U].map(kn.mark)
  , Cu = {
    badUrl: {
        error: !0,
        messages: "The url parameter passed does not look like a valid URL. Please check your data and try again."
    }
}
  , Ou = Is.browser ? {} : {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
}
  , Du = 1e4
  , ju = ["audio/mpeg", "image/gif", "image/jpeg", "image/jpg"]
  , Pu = new RegExp("^(" + ju.join("|") + ")$","i")
  , zu = 5242880
  , Nu = function() {
    function e(e, n) {
        return t.apply(this, arguments)
    }
    var t = ps(kn.mark(function e(t, n) {
        var r, a, i, o;
        return kn.wrap(function(e) {
            for (; ; )
                switch (e.prev = e.next) {
                case 0:
                    return n = n || Bs.parse(encodeURI(t)),
                    r = {
                        url: n.href,
                        headers: da({}, Ou),
                        timeout: Du,
                        jar: !0,
                        encoding: null,
                        gzip: !0,
                        followAllRedirects: !0
                    },
                    e.next = 4,
                    $(r);
                case 4:
                    return a = e.sent,
                    i = a.response,
                    o = a.body,
                    e.prev = 7,
                    V(i),
                    e.abrupt("return", {
                        body: o,
                        response: i
                    });
                case 12:
                    return e.prev = 12,
                    e.t0 = e.catch(7),
                    e.abrupt("return", Cu.badUrl);
                case 15:
                case "end":
                    return e.stop()
                }
        }, e, this, [[7, 12]])
    }));
    return e
}()
  , Wu = Ir
  , Lu = Ur.concat("length", "prototype")
  , Ru = Object.getOwnPropertyNames || function(e) {
    return Wu(e, Lu)
}
  , qu = {
    f: Ru
}
  , Yu = qu
  , Bu = Xr
  , Hu = Pn
  , Fu = Tn.Reflect
  , Iu = Fu && Fu.ownKeys || function(e) {
    var t = Yu.f(Hu(e))
      , n = Bu.f;
    return n ? t.concat(n(e)) : t
}
  , Uu = ir;
Uu(Uu.S, "Reflect", {
    ownKeys: Iu
});
var Gu = Sn.Reflect.ownKeys
  , $u = n(function(e) {
    e.exports = {
        default: Gu,
        __esModule: !0
    }
})
  , Vu = t($u)
  , Ku = new RegExp("transparent|spacer|blank","i")
  , Xu = "mercury-parser-keep"
  , Ju = ['iframe[src^="https://www.youtube.com"]', 'iframe[src^="http://www.youtube.com"]', 'iframe[src^="https://player.vimeo"]', 'iframe[src^="http://player.vimeo"]']
  , Zu = ["title", "script", "noscript", "link", "style", "hr", "embed", "iframe", "object"]
  , Qu = ["style", "align"]
  , ec = (Qu.map(function(e) {
    return "[" + e + "]"
}),
Qu.join(","),
["src", "srcset", "href", "class", "id", "alt", "xlink:href", "width", "height"])
  , tc = new RegExp("^(" + ec.join("|") + ")$","i")
  , nc = ["p"]
  , rc = (nc.map(function(e) {
    return e + ":empty"
}).join(","),
["ul", "ol", "table", "div", "button", "form"].join(","))
  , ac = ["h2", "h3", "h4", "h5", "h6"]
  , ic = ac.join(",")
  , oc = ["ad-break", "adbox", "advert", "addthis", "agegate", "aux", "blogger-labels", "combx", "comment", "conversation", "disqus", "entry-unrelated", "extra", "foot", "header", "hidden", "loader", "login", "menu", "meta", "nav", "outbrain", "pager", "pagination", "predicta", "presence_control_external", "popup", "printfriendly", "related", "remove", "remark", "rss", "share", "shoutbox", "sidebar", "sociable", "sponsor", "taboola", "tools"]
  , sc = ["and", "article", "body", "blogindex", "column", "content", "entry-content-asset", "format", "hfeed", "hentry", "hatom", "main", "page", "posts", "shadow"]
  , uc = ["a", "blockquote", "dl", "div", "img", "p", "pre", "table"].join(",")
  , cc = ["article", "articlecontent", "instapaper_body", "blog", "body", "content", "entry-content-asset", "entry", "hentry", "main", "Normal", "page", "pagination", "permalink", "post", "story", "text", "[-_]copy", "\\Bcopy"]
  , lc = new RegExp(cc.join("|"),"i")
  , fc = ["adbox", "advert", "author", "bio", "bookmark", "bottom", "byline", "clear", "com-", "combx", "comment", "comment\\B", "contact", "copy", "credit", "crumb", "date", "deck", "excerpt", "featured", "foot", "footer", "footnote", "graf", "head", "info", "infotext", "instapaper_ignore", "jump", "linebreak", "link", "masthead", "media", "meta", "modal", "outbrain", "promo", "pr_", "related", "respond", "roundcontent", "scroll", "secondary", "share", "shopping", "shoutbox", "side", "sidebar", "sponsor", "stamp", "sub", "summary", "tags", "tools", "widget"]
  , dc = new RegExp(fc.join("|"),"i")
  , hc = "meta[name=generator][value^=WordPress]"
  , pc = new RegExp("pag(e|ing|inat)","i")
  , mc = ["article", "aside", "blockquote", "body", "br", "button", "canvas", "caption", "col", "colgroup", "dd", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "map", "object", "ol", "output", "p", "pre", "progress", "section", "table", "tbody", "textarea", "tfoot", "th", "thead", "tr", "ul", "video"]
  , gc = new RegExp("^(" + mc.join("|") + ")$","i")
  , vc = oc.join("|")
  , yc = new RegExp(vc,"i")
  , bc = sc.join("|")
  , _c = new RegExp(bc,"i")
  , wc = Vn
  , Ac = Kn
  , xc = function(e, t, n) {
    t in e ? wc.f(e, t, Ac(0, n)) : e[t] = n
}
  , Mc = On
  , kc = ir
  , Tc = ea
  , Sc = Ni
  , Ec = qi
  , Cc = wr
  , Oc = xc
  , Dc = Fi;
kc(kc.S + kc.F * !Po(function(e) {
    Array.from(e)
}), "Array", {
    from: function(e) {
        var t, n, r, a, i = Tc(e), o = "function" == typeof this ? this : Array, s = arguments.length, u = s > 1 ? arguments[1] : void 0, c = void 0 !== u, l = 0, f = Dc(i);
        if (c && (u = Mc(u, s > 2 ? arguments[2] : void 0, 2)),
        void 0 == f || o == Array && Ec(f))
            for (t = Cc(i.length),
            n = new o(t); t > l; l++)
                Oc(n, l, c ? u(i[l], l) : i[l]);
        else
            for (a = f.call(i),
            n = new o; !(r = a.next()).done; l++)
                Oc(n, l, c ? Sc(a, u, [r.value, l], !0) : r.value);
        return n.length = l,
        n
    }
});
var jc = Sn.Array.from
  , Pc = n(function(e) {
    e.exports = {
        default: jc,
        __esModule: !0
    }
})
  , zc = t(Pc)
  , Nc = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = Pc
      , a = n(r);
    t.default = function(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
            return n
        }
        return (0,
        a.default)(e)
    }
})
  , Wc = t(Nc)
  , Lc = ir;
Lc(Lc.S + Lc.F * !Nn, "Object", {
    defineProperty: Vn.f
});
var Rc = Sn.Object
  , qc = function(e, t, n) {
    return Rc.defineProperty(e, t, n)
}
  , Yc = n(function(e) {
    e.exports = {
        default: qc,
        __esModule: !0
    }
})
  , Bc = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = Yc
      , a = n(r);
    t.default = function(e, t, n) {
        return t in e ? (0,
        a.default)(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
})
  , Hc = t(Bc)
  , Fc = ["ad-break", "adbox", "advert", "addthis", "agegate", "aux", "blogger-labels", "combx", "comment", "conversation", "disqus", "entry-unrelated", "extra", "foot", "form", "header", "hidden", "loader", "login", "menu", "meta", "nav", "pager", "pagination", "predicta", "presence_control_external", "popup", "printfriendly", "related", "remove", "remark", "rss", "share", "shoutbox", "sidebar", "sociable", "sponsor", "tools"]
  , Ic = ["and", "article", "body", "blogindex", "column", "content", "entry-content-asset", "format", "hfeed", "hentry", "hatom", "main", "page", "posts", "shadow"]
  , Uc = (["a", "blockquote", "dl", "div", "img", "p", "pre", "table"].join(","),
["br", "b", "i", "label", "hr", "area", "base", "basefont", "input", "img", "link", "meta"])
  , Gc = new RegExp("^(" + Uc.join("|") + ")$","i")
  , $c = [[".hentry", ".entry-content"], ["entry", ".entry-content"], [".entry", ".entry_content"], [".post", ".postbody"], [".post", ".post_body"], [".post", ".post-body"]]
  , Vc = ["figure", "photo", "image", "caption"]
  , Kc = new RegExp(Vc.join("|"),"i")
  , Xc = ["article", "articlecontent", "instapaper_body", "blog", "body", "content", "entry-content-asset", "entry", "hentry", "main", "Normal", "page", "pagination", "permalink", "post", "story", "text", "[-_]copy", "\\Bcopy"]
  , Jc = new RegExp(Xc.join("|"),"i")
  , Zc = new RegExp("entry-content-asset","i")
  , Qc = ["adbox", "advert", "author", "bio", "bookmark", "bottom", "byline", "clear", "com-", "combx", "comment", "comment\\B", "contact", "copy", "credit", "crumb", "date", "deck", "excerpt", "featured", "foot", "footer", "footnote", "graf", "head", "info", "infotext", "instapaper_ignore", "jump", "linebreak", "link", "masthead", "media", "meta", "modal", "outbrain", "promo", "pr_", "related", "respond", "roundcontent", "scroll", "secondary", "share", "shopping", "shoutbox", "side", "sidebar", "sponsor", "stamp", "sub", "summary", "tags", "tools", "widget"]
  , el = new RegExp(Qc.join("|"),"i")
  , tl = (Fc.join("|"),
Ic.join("|"),
new RegExp("^(p|li|span|pre)$","i"))
  , nl = new RegExp("^(td|blockquote|ol|ul|dl)$","i")
  , rl = new RegExp("^(address|form)$","i")
  , al = new RegExp("^(p|pre)$","i")
  , il = ja
  , ol = {
    f: il
}
  , sl = ol.f("iterator")
  , ul = n(function(e) {
    e.exports = {
        default: sl,
        __esModule: !0
    }
})
  , cl = n(function(e) {
    var t = Wr("meta")
      , n = Dn
      , r = sr
      , a = Vn.f
      , i = 0
      , o = Object.isExtensible || function() {
        return !0
    }
      , s = !zn(function() {
        return o(Object.preventExtensions({}))
    })
      , u = function(e) {
        a(e, t, {
            value: {
                i: "O" + ++i,
                w: {}
            }
        })
    }
      , c = function(e, a) {
        if (!n(e))
            return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
        if (!r(e, t)) {
            if (!o(e))
                return "F";
            if (!a)
                return "E";
            u(e)
        }
        return e[t].i
    }
      , l = function(e, n) {
        if (!r(e, t)) {
            if (!o(e))
                return !0;
            if (!n)
                return !1;
            u(e)
        }
        return e[t].w
    }
      , f = function(e) {
        return s && d.NEED && o(e) && !r(e, t) && u(e),
        e
    }
      , d = e.exports = {
        KEY: t,
        NEED: !1,
        fastKey: c,
        getWeak: l,
        onFreeze: f
    }
})
  , ll = Tn
  , fl = Sn
  , dl = ga
  , hl = ol
  , pl = Vn.f
  , ml = function(e) {
    var t = fl.Symbol || (fl.Symbol = dl ? {} : ll.Symbol || {});
    "_" == e.charAt(0) || e in t || pl(t, e, {
        value: hl.f(e)
    })
}
  , gl = Vr
  , vl = mr
  , yl = function(e, t) {
    for (var n, r = vl(e), a = gl(r), i = a.length, o = 0; i > o; )
        if (r[n = a[o++]] === t)
            return n
}
  , bl = Vr
  , _l = Xr
  , wl = Zr
  , Al = function(e) {
    var t = bl(e)
      , n = _l.f;
    if (n)
        for (var r, a = n(e), i = wl.f, o = 0; a.length > o; )
            i.call(e, r = a[o++]) && t.push(r);
    return t
}
  , xl = cr
  , Ml = Array.isArray || function(e) {
    return "Array" == xl(e)
}
  , kl = mr
  , Tl = qu.f
  , Sl = {}.toString
  , El = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
  , Cl = function(e) {
    try {
        return Tl(e)
    } catch (e) {
        return El.slice()
    }
}
  , Ol = function(e) {
    return El && "[object Window]" == Sl.call(e) ? Cl(e) : Tl(kl(e))
}
  , Dl = {
    f: Ol
}
  , jl = Zr
  , Pl = Kn
  , zl = mr
  , Nl = Hn
  , Wl = sr
  , Ll = Yn
  , Rl = Object.getOwnPropertyDescriptor
  , ql = Nn ? Rl : function(e, t) {
    if (e = zl(e),
    t = Nl(t, !0),
    Ll)
        try {
            return Rl(e, t)
        } catch (e) {}
    if (Wl(e, t))
        return Pl(!jl.f.call(e, t), e[t])
}
  , Yl = {
    f: ql
}
  , Bl = Tn
  , Hl = sr
  , Fl = Nn
  , Il = ir
  , Ul = va
  , Gl = cl.KEY
  , $l = zn
  , Vl = Pr
  , Kl = Wa
  , Xl = Wr
  , Jl = ja
  , Zl = ol
  , Ql = ml
  , ef = yl
  , tf = Al
  , nf = Ml
  , rf = Pn
  , af = mr
  , of = Hn
  , sf = Kn
  , uf = Da
  , cf = Dl
  , lf = Yl
  , ff = Vn
  , df = Vr
  , hf = lf.f
  , pf = ff.f
  , mf = cf.f
  , gf = Bl.Symbol
  , vf = Bl.JSON
  , yf = vf && vf.stringify
  , bf = "prototype"
  , _f = Jl("_hidden")
  , wf = Jl("toPrimitive")
  , Af = {}.propertyIsEnumerable
  , xf = Vl("symbol-registry")
  , Mf = Vl("symbols")
  , kf = Vl("op-symbols")
  , Tf = Object[bf]
  , Sf = "function" == typeof gf
  , Ef = Bl.QObject
  , Cf = !Ef || !Ef[bf] || !Ef[bf].findChild
  , Of = Fl && $l(function() {
    return 7 != uf(pf({}, "a", {
        get: function() {
            return pf(this, "a", {
                value: 7
            }).a
        }
    })).a
}) ? function(e, t, n) {
    var r = hf(Tf, t);
    r && delete Tf[t],
    pf(e, t, n),
    r && e !== Tf && pf(Tf, t, r)
}
: pf
  , Df = function(e) {
    var t = Mf[e] = uf(gf[bf]);
    return t._k = e,
    t
}
  , jf = Sf && "symbol" == typeof gf.iterator ? function(e) {
    return "symbol" == typeof e
}
: function(e) {
    return e instanceof gf
}
  , Pf = function(e, t, n) {
    return e === Tf && Pf(kf, t, n),
    rf(e),
    t = of(t, !0),
    rf(n),
    Hl(Mf, t) ? (n.enumerable ? (Hl(e, _f) && e[_f][t] && (e[_f][t] = !1),
    n = uf(n, {
        enumerable: sf(0, !1)
    })) : (Hl(e, _f) || pf(e, _f, sf(1, {})),
    e[_f][t] = !0),
    Of(e, t, n)) : pf(e, t, n)
}
  , zf = function(e, t) {
    rf(e);
    for (var n, r = tf(t = af(t)), a = 0, i = r.length; i > a; )
        Pf(e, n = r[a++], t[n]);
    return e
}
  , Nf = function(e, t) {
    return void 0 === t ? uf(e) : zf(uf(e), t)
}
  , Wf = function(e) {
    var t = Af.call(this, e = of(e, !0));
    return !(this === Tf && Hl(Mf, e) && !Hl(kf, e)) && (!(t || !Hl(this, e) || !Hl(Mf, e) || Hl(this, _f) && this[_f][e]) || t)
}
  , Lf = function(e, t) {
    if (e = af(e),
    t = of(t, !0),
    e !== Tf || !Hl(Mf, t) || Hl(kf, t)) {
        var n = hf(e, t);
        return !n || !Hl(Mf, t) || Hl(e, _f) && e[_f][t] || (n.enumerable = !0),
        n
    }
}
  , Rf = function(e) {
    for (var t, n = mf(af(e)), r = [], a = 0; n.length > a; )
        Hl(Mf, t = n[a++]) || t == _f || t == Gl || r.push(t);
    return r
}
  , qf = function(e) {
    for (var t, n = e === Tf, r = mf(n ? kf : af(e)), a = [], i = 0; r.length > i; )
        !Hl(Mf, t = r[i++]) || n && !Hl(Tf, t) || a.push(Mf[t]);
    return a
};
Sf || (gf = function() {
    if (this instanceof gf)
        throw TypeError("Symbol is not a constructor!");
    var e = Xl(arguments.length > 0 ? arguments[0] : void 0)
      , t = function(n) {
        this === Tf && t.call(kf, n),
        Hl(this, _f) && Hl(this[_f], e) && (this[_f][e] = !1),
        Of(this, e, sf(1, n))
    };
    return Fl && Cf && Of(Tf, e, {
        configurable: !0,
        set: t
    }),
    Df(e)
}
,
Ul(gf[bf], "toString", function() {
    return this._k
}),
lf.f = Lf,
ff.f = Pf,
qu.f = cf.f = Rf,
Zr.f = Wf,
Xr.f = qf,
Fl && !ga && Ul(Tf, "propertyIsEnumerable", Wf, !0),
Zl.f = function(e) {
    return Df(Jl(e))
}
),
Il(Il.G + Il.W + Il.F * !Sf, {
    Symbol: gf
});
for (var Yf = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Bf = 0; Yf.length > Bf; )
    Jl(Yf[Bf++]);
for (var Yf = df(Jl.store), Bf = 0; Yf.length > Bf; )
    Ql(Yf[Bf++]);
Il(Il.S + Il.F * !Sf, "Symbol", {
    for: function(e) {
        return Hl(xf, e += "") ? xf[e] : xf[e] = gf(e)
    },
    keyFor: function(e) {
        if (jf(e))
            return ef(xf, e);
        throw TypeError(e + " is not a symbol!")
    },
    useSetter: function() {
        Cf = !0
    },
    useSimple: function() {
        Cf = !1
    }
}),
Il(Il.S + Il.F * !Sf, "Object", {
    create: Nf,
    defineProperty: Pf,
    defineProperties: zf,
    getOwnPropertyDescriptor: Lf,
    getOwnPropertyNames: Rf,
    getOwnPropertySymbols: qf
}),
vf && Il(Il.S + Il.F * (!Sf || $l(function() {
    var e = gf();
    return "[null]" != yf([e]) || "{}" != yf({
        a: e
    }) || "{}" != yf(Object(e))
})), "JSON", {
    stringify: function(e) {
        if (void 0 !== e && !jf(e)) {
            for (var t, n, r = [e], a = 1; arguments.length > a; )
                r.push(arguments[a++]);
            return t = r[1],
            "function" == typeof t && (n = t),
            !n && nf(t) || (t = function(e, t) {
                if (n && (t = n.call(this, e, t)),
                !jf(t))
                    return t
            }
            ),
            r[1] = t,
            yf.apply(vf, r)
        }
    }
}),
gf[bf][wf] || Zn(gf[bf], wf, gf[bf].valueOf),
Kl(gf, "Symbol"),
Kl(Math, "Math", !0),
Kl(Bl.JSON, "JSON", !0),
ml("asyncIterator"),
ml("observable");
var Hf = Sn.Symbol
  , Ff = n(function(e) {
    e.exports = {
        default: Hf,
        __esModule: !0
    }
})
  , If = n(function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var r = ul
      , a = n(r)
      , i = Ff
      , o = n(i)
      , s = "function" == typeof o.default && "symbol" == typeof a.default ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : typeof e
    }
    ;
    t.default = "function" == typeof o.default && "symbol" === s(a.default) ? function(e) {
        return "undefined" == typeof e ? "undefined" : s(e)
    }
    : function(e) {
        return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : s(e)
    }
})
  , Uf = t(If)
  , Gf = new RegExp("https?://","i")
  , $f = new RegExp(".(png|gif|jpe?g)","i")
  , Vf = ["script", "style", "form"].join(",")
  , Kf = {
    create: function(e, t, n) {
        var r = this;
        return ps(kn.mark(function a() {
            var i, o;
            return kn.wrap(function(a) {
                for (; ; )
                    switch (a.prev = a.next) {
                    case 0:
                        if (i = void 0,
                        !t) {
                            a.next = 6;
                            break
                        }
                        o = {
                            statusMessage: "OK",
                            statusCode: 200,
                            headers: {
                                "content-type": "text/html",
                                "content-length": 500
                            }
                        },
                        i = {
                            body: t,
                            response: o
                        },
                        a.next = 9;
                        break;
                    case 6:
                        return a.next = 8,
                        Nu(e, n);
                    case 8:
                        i = a.sent;
                    case 9:
                        if (!i.error) {
                            a.next = 12;
                            break
                        }
                        return i.failed = !0,
                        a.abrupt("return", i);
                    case 12:
                        return a.abrupt("return", r.generateDoc(i));
                    case 13:
                    case "end":
                        return a.stop()
                    }
            }, a, r)
        }))()
    },
    generateDoc: function(e) {
        var t = e.body
          , n = e.response
          , r = n.headers["content-type"];
        if (!r.includes("html") && !r.includes("text"))
            throw new Error("Content does not appear to be text.");
        var a = this.encodeDoc({
            content: t,
            contentType: r
        });
        if (0 === a.root().children().length)
            throw new Error("No children, likely a bad parse.");
        return a = X(a),
        a = $e(a),
        a = Xe(a)
    },
    encodeDoc: function(e) {
        var t = e.content
          , n = e.contentType
          , r = j(n)
          , a = $s.decode(t, r)
          , i = Is.load(a)
          , o = i("meta[http-equiv=content-type]").attr("content")
          , s = j(o);
        return s !== r && (a = $s.decode(t, s),
        i = Is.load(a)),
        i
    }
}
  , Xf = ir
  , Jf = Sn
  , Zf = zn
  , Qf = function(e, t) {
    var n = (Jf.Object || {})[e] || Object[e]
      , r = {};
    r[e] = t(n),
    Xf(Xf.S + Xf.F * Zf(function() {
        n(1)
    }), "Object", r)
}
  , ed = ea
  , td = Vr;
Qf("keys", function() {
    return function(e) {
        return td(ed(e))
    }
});
var nd = Sn.Object.keys
  , rd = n(function(e) {
    e.exports = {
        default: nd,
        __esModule: !0
    }
})
  , ad = t(rd)
  , id = function(e, t) {
    return t.reduce(function(t, n) {
        return t[n] = e,
        t
    }, {})
}
  , od = {
    domain: "blogspot.com",
    content: {
        selectors: [".post-content noscript"],
        clean: [],
        transforms: {
            noscript: "div"
        }
    },
    author: {
        selectors: [".post-author-name"]
    },
    title: {
        selectors: [".post h2.title"]
    },
    date_published: {
        selectors: ["span.publishdate"]
    }
}
  , sd = {
    domain: "nymag.com",
    content: {
        selectors: ["div.article-content", "section.body", "article.article"],
        clean: [".ad", ".single-related-story"],
        transforms: {
            h1: "h2",
            noscript: function(e, t) {
                var n = t.browser ? t(e.text()) : e.children();
                return 1 === n.length && void 0 !== n.get(0) && "img" === n.get(0).tagName.toLowerCase() ? "figure" : null
            }
        }
    },
    title: {
        selectors: ["h1.lede-feature-title", "h1.headline-primary", "h1"]
    },
    author: {
        selectors: [".by-authors", ".lede-feature-author"]
    },
    dek: {
        selectors: [".lede-feature-teaser"]
    },
    date_published: {
        selectors: [["time.article-timestamp[datetime]", "datetime"], "time.article-timestamp"]
    }
}
  , ud = {
    domain: "wikipedia.org",
    content: {
        selectors: ["#mw-content-text"],
        defaultCleaner: !1,
        transforms: {
            ".infobox img": function(e) {
                var t = e.parents(".infobox");
                0 === t.children("img").length && t.prepend(e)
            },
            ".infobox caption": "figcaption",
            ".infobox": "figure"
        },
        clean: [".mw-editsection", "figure tr, figure td, figure tbody", "#toc", ".navbox"]
    },
    author: "Wikipedia Contributors",
    title: {
        selectors: ["h2.title"]
    },
    date_published: {
        selectors: ["#footer-info-lastmod"]
    }
}
  , cd = {
    domain: "twitter.com",
    content: {
        transforms: {
            ".permalink[role=main]": function(e, t) {
                var n = e.find(".tweet")
                  , r = t('<div id="TWEETS_GO_HERE"></div>');
                r.append(n),
                e.replaceWith(r)
            },
            s: "span"
        },
        selectors: [".permalink[role=main]"],
        defaultCleaner: !1,
        clean: [".stream-item-footer", "button", ".tweet-details-fixer"]
    },
    author: {
        selectors: [".tweet.permalink-tweet .username"]
    },
    date_published: {
        selectors: [[".permalink-tweet ._timestamp[data-time-ms]", "data-time-ms"]]
    }
}
  , ld = {
    domain: "www.nytimes.com",
    title: {
        selectors: [".g-headline", "h1.headline"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"], ".g-byline", ".byline"]
    },
    content: {
        selectors: ["div.g-blocks", "article#story"],
        transforms: {
            "img.g-lazy": function(e) {
                var t = e.attr("src")
                  , n = 640;
                t = t.replace("{{size}}", n),
                e.attr("src", t)
            }
        },
        clean: [".ad", "header#story-header", ".story-body-1 .lede.video", ".visually-hidden", "#newsletter-promo", ".promo", ".comments-button", ".hidden", ".comments", ".supplemental", ".nocontent", ".story-footer-links"]
    },
    date_published: {
        selectors: [['meta[name="article:published"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: null,
    next_page_url: null,
    excerpt: null
}
  , fd = {
    domain: "www.theatlantic.com",
    title: {
        selectors: ["h1.hed"]
    },
    author: {
        selectors: ["article#article .article-cover-extra .metadata .byline a"]
    },
    content: {
        selectors: [[".article-cover figure.lead-img", ".article-body"], ".article-body"],
        transforms: [],
        clean: [".partner-box", ".callout"]
    },
    date_published: {
        selectors: [['time[itemProp="datePublished"]', "datetime"]]
    },
    lead_image_url: null,
    next_page_url: null,
    excerpt: null
}
  , dd = {
    domain: "www.newyorker.com",
    title: {
        selectors: ["h1.title"]
    },
    author: {
        selectors: [".contributors"]
    },
    content: {
        selectors: ["div#articleBody", "div.articleBody"],
        transforms: [],
        clean: []
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"], ['time[itemProp="datePublished"]', "content"]],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: [".dek", "h2.dek"]
    },
    next_page_url: null,
    excerpt: null
}
  , hd = {
    domain: "www.wired.com",
    title: {
        selectors: ["h1.post-title"]
    },
    author: {
        selectors: ['a[rel="author"]']
    },
    content: {
        selectors: ["article.content"],
        transforms: [],
        clean: [".visually-hidden", "figcaption img.photo"]
    },
    date_published: {
        selectors: [['meta[itemprop="datePublished"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , pd = {
    domain: "www.msn.com",
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: ["span.authorname-txt"]
    },
    content: {
        selectors: ["div.richtext"],
        transforms: [],
        clean: ["span.caption"]
    },
    date_published: {
        selectors: ["span.time"]
    },
    lead_image_url: {
        selectors: []
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , md = {
    domain: "www.yahoo.com",
    title: {
        selectors: ["header.canvas-header"]
    },
    author: {
        selectors: ["span.provider-name"]
    },
    content: {
        selectors: [".content-canvas"],
        transforms: [],
        clean: [".figure-caption"]
    },
    date_published: {
        selectors: [["time.date[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , gd = {
    domain: "www.buzzfeed.com",
    title: {
        selectors: ['h1[id="post-title"]']
    },
    author: {
        selectors: ['a[data-action="user/username"]', "byline__author"]
    },
    content: {
        selectors: [[".longform_custom_header_media", "#buzz_sub_buzz"], "#buzz_sub_buzz"],
        defaultCleaner: !1,
        transforms: {
            h2: "b",
            "div.longform_custom_header_media": function(e) {
                return e.has("img") && e.has(".longform_header_image_source") ? "figure" : null
            },
            "figure.longform_custom_header_media .longform_header_image_source": "figcaption"
        },
        clean: [".instapaper_ignore", ".suplist_list_hide .buzz_superlist_item .buzz_superlist_number_inline", ".share-box", ".print"]
    },
    date_published: {
        selectors: [".buzz-datetime"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , vd = {
    domain: "fandom.wikia.com",
    title: {
        selectors: ["h1.entry-title"]
    },
    author: {
        selectors: [".author vcard", ".fn"]
    },
    content: {
        selectors: [".grid-content", ".entry-content"],
        transforms: [],
        clean: []
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , yd = {
    domain: "www.littlethings.com",
    title: {
        selectors: ["h1.post-title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    content: {
        selectors: [".mainContentIntro", ".content-wrapper"],
        transforms: [],
        clean: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    next_page_url: null,
    excerpt: null
}
  , bd = {
    domain: "www.politico.com",
    title: {
        selectors: [['meta[name="og:title"]', "value"]]
    },
    author: {
        selectors: [".story-main-content .byline .vcard"]
    },
    content: {
        selectors: [".story-main-content", ".content-group", ".story-core", ".story-text"],
        transforms: [],
        clean: ["figcaption"]
    },
    date_published: {
        selectors: [[".story-main-content .timestamp time[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: null,
    excerpt: null
}
  , _d = {
    domain: "deadspin.com",
    supportedDomains: ["jezebel.com", "lifehacker.com", "kotaku.com", "gizmodo.com", "jalopnik.com", "kinja.com"],
    title: {
        selectors: ["h1.headline"]
    },
    author: {
        selectors: [".author"]
    },
    content: {
        selectors: [".post-content", ".entry-content"],
        transforms: {
            'iframe.lazyload[data-recommend-id^="youtube://"]': function(e) {
                var t = e.attr("id").split("youtube-")[1];
                e.attr("src", "https://www.youtube.com/embed/" + t)
            }
        },
        clean: [".magnifier", ".lightbox"]
    },
    date_published: {
        selectors: [["time.updated[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: {
        selectors: []
    },
    excerpt: {
        selectors: []
    }
}
  , wd = {
    domain: "www.broadwayworld.com",
    title: {
        selectors: ["h1.article-title"]
    },
    author: {
        selectors: ["span[itemprop=author]"]
    },
    content: {
        selectors: ["div[itemprop=articlebody]"],
        transforms: {},
        clean: []
    },
    date_published: {
        selectors: [["meta[itemprop=datePublished]", "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: {
        selectors: []
    },
    excerpt: {
        selectors: []
    }
}
  , Ad = {
    domain: "www.apartmenttherapy.com",
    title: {
        selectors: ["h1.headline"]
    },
    author: {
        selectors: [".PostByline__name"]
    },
    content: {
        selectors: ["div.post__content"],
        transforms: {
            'div[data-render-react-id="images/LazyPicture"]': function(e, t) {
                var n = JSON.parse(e.attr("data-props"))
                  , r = n.sources[0].src
                  , a = t("<img />").attr("src", r);
                e.replaceWith(a)
            }
        },
        clean: []
    },
    date_published: {
        selectors: [[".PostByline__timestamp[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: {
        selectors: []
    },
    excerpt: {
        selectors: []
    }
}
  , xd = {
    domain: "medium.com",
    supportedDomains: ["trackchanges.postlight.com"],
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    content: {
        selectors: [[".section-content"], ".section-content", "article > div > section"],
        transforms: {
            iframe: function(e) {
                var t = /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//
                  , n = decodeURIComponent(e.attr("data-thumbnail"));
                if (t.test(n)) {
                    var r = n.match(t)
                      , a = pu(r, 2)
                      , i = (a[0],
                    a[1]);
                    e.attr("src", "https://www.youtube.com/embed/" + i);
                    var o = e.parents("figure")
                      , s = o.find("figcaption");
                    o.empty().append([e, s])
                }
            },
            figure: function(e) {
                if (!(e.find("iframe").length > 0)) {
                    var t = e.find("img").slice(-1)[0]
                      , n = e.find("figcaption");
                    e.empty().append([t, n])
                }
            }
        },
        clean: []
    },
    date_published: {
        selectors: [["time[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    dek: {
        selectors: []
    },
    next_page_url: {
        selectors: []
    },
    excerpt: {
        selectors: []
    }
}
  , Md = {
    domain: "www.tmz.com",
    title: {
        selectors: [".post-title-breadcrumb", "h1", ".headline"]
    },
    author: "TMZ STAFF",
    date_published: {
        selectors: [".article-posted-date"],
        timezone: "America/Los_Angeles"
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-content", ".all-post-body"],
        transforms: {},
        clean: [".lightbox-link"]
    }
}
  , kd = {
    domain: "www.washingtonpost.com",
    title: {
        selectors: ["h1", "#topper-headline-wrapper"]
    },
    author: {
        selectors: [".pb-byline"]
    },
    date_published: {
        selectors: [['.pb-timestamp[itemprop="datePublished"]', "content"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-body"],
        transforms: {
            "div.inline-content": function(e) {
                return e.has("img,iframe,video").length > 0 ? "figure" : (e.remove(),
                null)
            },
            ".pb-caption": "figcaption"
        },
        clean: [".interstitial-link", ".newsletter-inline-unit"]
    }
}
  , Td = {
    domain: "www.huffingtonpost.com",
    title: {
        selectors: ["h1.headline__title"]
    },
    author: {
        selectors: ["span.author-card__details__name"]
    },
    date_published: {
        selectors: [['meta[name="article:modified_time"]', "value"], ['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: ["h2.headline__subtitle"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.entry__body"],
        defaultCleaner: !1,
        transforms: {},
        clean: [".pull-quote", ".tag-cloud", ".embed-asset", ".below-entry", ".entry-corrections", "#suggested-story"]
    }
}
  , Sd = {
    domain: "newrepublic.com",
    title: {
        selectors: ["h1.article-headline", ".minutes-primary h1.minute-title"]
    },
    author: {
        selectors: ["div.author-list", ".minutes-primary h3.minute-byline"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]],
        timezone: "America/New_York"
    },
    dek: {
        selectors: ["h2.article-subhead"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".article-cover", "div.content-body"], [".minute-image", ".minutes-primary div.content-body"]],
        transforms: {},
        clean: ["aside"]
    }
}
  , Ed = {
    domain: "money.cnn.com",
    title: {
        selectors: [".article-title"]
    },
    author: {
        selectors: [".byline a"]
    },
    date_published: {
        selectors: [['meta[name="date"]', "value"]],
        timezone: "GMT"
    },
    dek: {
        selectors: ["#storytext h2"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["#storytext"],
        transforms: {},
        clean: [".inStoryHeading"]
    }
}
  , Cd = {
    domain: "www.theverge.com",
    supportedDomains: ["www.polygon.com"],
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: ["h2.p-dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".c-entry-hero .e-image", ".c-entry-intro", ".c-entry-content"], [".e-image--hero", ".c-entry-content"], ".l-wrapper .l-feature", "div.c-entry-content"],
        transforms: {
            noscript: function(e) {
                var t = e.children();
                return 1 === t.length && "img" === t.get(0).tagName ? "span" : null
            }
        },
        clean: [".aside", "img.c-dynamic-image"]
    }
}
  , Od = {
    domain: "www.cnn.com",
    title: {
        selectors: ["h1.pg-headline", "h1"]
    },
    author: {
        selectors: [".metadata__byline__author"]
    },
    date_published: {
        selectors: [['meta[name="pubdate"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".media__video--thumbnail", ".zn-body-text"], ".zn-body-text", 'div[itemprop="articleBody"]'],
        transforms: {
            ".zn-body__paragraph, .el__leafmedia--sourced-paragraph": function(e) {
                var t = e.html();
                return t ? "p" : null
            },
            ".zn-body__paragraph": function(e) {
                e.has("a") && e.text().trim() === e.find("a").text().trim() && e.remove()
            },
            ".media__video--thumbnail": "figure"
        },
        clean: []
    }
}
  , Dd = {
    domain: "www.aol.com",
    title: {
        selectors: ["h1.p-article__title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [".p-article__byline__date"],
        timezone: "America/New_York"
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-content"],
        transforms: {},
        clean: []
    }
}
  , jd = {
    domain: "www.youtube.com",
    title: {
        selectors: [".watch-title", "h1.watch-title-container"]
    },
    author: {
        selectors: [".yt-user-info"]
    },
    date_published: {
        selectors: [['meta[itemProp="datePublished"]', "value"]],
        timezone: "GMT"
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        defaultCleaner: !1,
        selectors: [["#player-api", "#eow-description"]],
        transforms: {
            "#player-api": function(e, t) {
                var n = t('meta[itemProp="videoId"]').attr("value");
                e.html('\n          <iframe src="https://www.youtube.com/embed/' + n + '" frameborder="0" allowfullscreen></iframe>')
            }
        },
        clean: []
    }
}
  , Pd = {
    domain: "www.theguardian.com",
    title: {
        selectors: [".content__headline"]
    },
    author: {
        selectors: ["p.byline"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [".content__standfirst"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".content__article-body"],
        transforms: {},
        clean: [".hide-on-mobile", ".inline-icon"]
    }
}
  , zd = {
    domain: "www.sbnation.com",
    title: {
        selectors: ["h1.c-page-title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: ["h2.c-entry-summary.p-dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.c-entry-content"],
        transforms: {},
        clean: []
    }
}
  , Nd = {
    domain: "www.bloomberg.com",
    title: {
        selectors: [".lede-headline", "h1.article-title", "h1.lede-text-only__hed"]
    },
    author: {
        selectors: [['meta[name="parsely-author"]', "value"], ".byline-details__link", ".bydek", ".author"]
    },
    date_published: {
        selectors: [["time.published-at", "datetime"], ["time[datetime]", "datetime"], ['meta[name="date"]', "value"], ['meta[name="parsely-pub-date"]', "value"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-body__content", ["section.copy-block"], ".body-copy"],
        transforms: {},
        clean: [".inline-newsletter", ".page-ad"]
    }
}
  , Wd = {
    domain: "www.bustle.com",
    title: {
        selectors: ["h1.post-page__title"]
    },
    author: {
        selectors: ["div.content-meta__author"]
    },
    date_published: {
        selectors: [["time.content-meta__published-date[datetime]", "datetime"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".post-page__body"],
        transforms: {},
        clean: []
    }
}
  , Ld = {
    domain: "www.npr.org",
    title: {
        selectors: ["h1", ".storytitle"]
    },
    author: {
        selectors: ["p.byline__name.byline__name--block"]
    },
    date_published: {
        selectors: [[".dateblock time[datetime]", "datetime"], ['meta[name="date"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"], ['meta[name="twitter:image:src"]', "value"]]
    },
    content: {
        selectors: [".storytext"],
        transforms: {
            ".bucketwrap.image": "figure",
            ".bucketwrap.image .credit-caption": "figcaption"
        },
        clean: ["div.enlarge_measure"]
    }
}
  , Rd = {
    domain: "www.recode.net",
    title: {
        selectors: ["h1.c-page-title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: ["h2.c-entry-summary.p-dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["figure.e-image--hero", ".c-entry-content"], ".c-entry-content"],
        transforms: {},
        clean: []
    }
}
  , qd = {
    domain: "qz.com",
    title: {
        selectors: ["header.item-header.content-width-responsive"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [".timestamp"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["figure.featured-image", ".item-body"], ".item-body"],
        transforms: {},
        clean: [".article-aside", ".progressive-image-thumbnail"]
    }
}
  , Yd = {
    domain: "www.dmagazine.com",
    title: {
        selectors: ["h1.story__title"]
    },
    author: {
        selectors: [".story__info .story__info__item:first-child"]
    },
    date_published: {
        selectors: [".story__info"],
        timezone: "America/Chicago"
    },
    dek: {
        selectors: [".story__subhead"]
    },
    lead_image_url: {
        selectors: [["article figure a:first-child", "href"]]
    },
    content: {
        selectors: [".story__content"],
        transforms: {},
        clean: []
    }
}
  , Bd = {
    domain: "www.reuters.com",
    title: {
        selectors: ["h1.article-headline"]
    },
    author: {
        selectors: [".author"]
    },
    date_published: {
        selectors: [['meta[name="og:article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["#article-text"],
        transforms: {
            ".article-subtitle": "h4"
        },
        clean: ["#article-byline .author"]
    }
}
  , Hd = {
    domain: "mashable.com",
    title: {
        selectors: ["h1.title"]
    },
    author: {
        selectors: ["span.author_name a"]
    },
    date_published: {
        selectors: [['meta[name="og:article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["section.article-content.blueprint"],
        transforms: {
            ".image-credit": "figcaption"
        },
        clean: []
    }
}
  , Fd = {
    domain: "www.chicagotribune.com",
    title: {
        selectors: ["h1.trb_ar_hl_t"]
    },
    author: {
        selectors: ["span.trb_ar_by_nm_au"]
    },
    date_published: {
        selectors: [['meta[itemprop="datePublished"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.trb_ar_page"],
        transforms: {},
        clean: []
    }
}
  , Id = {
    domain: "www.vox.com",
    title: {
        selectors: ["h1.c-page-title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [".p-dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["figure.e-image--hero", ".c-entry-content"], ".c-entry-content"],
        transforms: {
            "figure .e-image__image noscript": function(e) {
                var t = e.html();
                e.parents(".e-image__image").find(".c-dynamic-image").replaceWith(t)
            },
            "figure .e-image__meta": "figcaption"
        },
        clean: []
    }
}
  , Ud = {
    domain: "news.nationalgeographic.com",
    title: {
        selectors: ["h1", "h1.main-title"]
    },
    author: {
        selectors: [".byline-component__contributors b span"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]],
        format: "ddd MMM DD HH:mm:ss zz YYYY",
        timezone: "EST"
    },
    dek: {
        selectors: [".article__deck"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".parsys.content", ".__image-lead__"], ".content"],
        transforms: {
            ".parsys.content": function(e, t) {
                var n = e.find(".image.parbase.section").find(".picturefill").first().data("platform-src");
                n && e.prepend(t('<img class="__image-lead__" src="' + n + '"/>'))
            }
        },
        clean: [".pull-quote.pull-quote--large"]
    }
}
  , Gd = {
    domain: "www.nationalgeographic.com",
    title: {
        selectors: ["h1", "h1.main-title"]
    },
    author: {
        selectors: [".byline-component__contributors b span"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [".article__deck"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".parsys.content", ".__image-lead__"], ".content"],
        transforms: {
            ".parsys.content": function(e, t) {
                var n = e.children().first();
                if (n.hasClass("imageGroup")) {
                    var r = n.find(".media--medium__container").children().first()
                      , a = r.data("platform-image1-path")
                      , i = r.data("platform-image2-path");
                    i && a && e.prepend(t('<div class="__image-lead__">\n                <img src="' + a + '"/>\n                <img src="' + i + '"/>\n              </div>'))
                } else {
                    var o = e.find(".image.parbase.section").find(".picturefill").first().data("platform-src");
                    o && e.prepend(t('<img class="__image-lead__" src="' + o + '"/>'))
                }
            }
        },
        clean: [".pull-quote.pull-quote--small"]
    }
}
  , $d = {
    domain: "www.latimes.com",
    title: {
        selectors: [".trb_ar_hl"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[itemprop="datePublished"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".trb_ar_main"],
        transforms: {
            ".trb_ar_la": function(e) {
                var t = e.find("figure");
                e.replaceWith(t)
            }
        },
        clean: [".trb_ar_by", ".trb_ar_cr"]
    }
}
  , Vd = {
    domain: "pagesix.com",
    supportedDomains: ["nypost.com"],
    title: {
        selectors: ["h1 a"]
    },
    author: {
        selectors: [".byline"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [['meta[name="description"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["#featured-image-wrapper", ".entry-content"], ".entry-content"],
        transforms: {
            "#featured-image-wrapper": "figure",
            ".wp-caption-text": "figcaption"
        },
        clean: [".modal-trigger"]
    }
}
  , Kd = {
    domain: "thefederalistpapers.org",
    title: {
        selectors: ["h1.entry-title"]
    },
    author: {
        selectors: ["main span.entry-author-name"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-content"],
        transforms: {},
        clean: [["p[style]"]]
    }
}
  , Xd = {
    domain: "www.cbssports.com",
    title: {
        selectors: [".article-headline"]
    },
    author: {
        selectors: [".author-name"]
    },
    date_published: {
        selectors: [[".date-original-reading-time time", "datetime"]],
        timezone: "UTC"
    },
    dek: {
        selectors: [".article-subline"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article"],
        transforms: {},
        clean: []
    }
}
  , Jd = {
    domain: "www.msnbc.com",
    title: {
        selectors: ["h1", "h1.is-title-pane"]
    },
    author: {
        selectors: [".author"]
    },
    date_published: {
        selectors: [['meta[name="DC.date.issued"]', "value"]]
    },
    dek: {
        selectors: [['meta[name="description"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".pane-node-body"],
        transforms: {
            ".pane-node-body": function(e, t) {
                var n = pu(Jd.lead_image_url.selectors[0], 2)
                  , r = n[0]
                  , a = n[1]
                  , i = t(r).attr(a);
                i && e.prepend('<img src="' + i + '" />')
            }
        },
        clean: []
    }
}
  , Zd = {
    domain: "www.thepoliticalinsider.com",
    title: {
        selectors: [['meta[name="sailthru.title"]', "value"]]
    },
    author: {
        selectors: [['meta[name="sailthru.author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="sailthru.date"]', "value"]],
        timezone: "America/New_York"
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div#article-body"],
        transforms: {},
        clean: []
    }
}
  , Qd = {
    domain: "www.mentalfloss.com",
    title: {
        selectors: ["h1.title", ".title-group", ".inner"]
    },
    author: {
        selectors: [".field-name-field-enhanced-authors"]
    },
    date_published: {
        selectors: [".date-display-single"],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.field.field-name-body"],
        transforms: {},
        clean: []
    }
}
  , eh = {
    domain: "abcnews.go.com",
    title: {
        selectors: [".article-header h1"]
    },
    author: {
        selectors: [".authors"],
        clean: [".author-overlay", ".by-text"]
    },
    date_published: {
        selectors: [".timestamp"],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-copy"],
        transforms: {},
        clean: []
    }
}
  , th = {
    domain: "www.nydailynews.com",
    title: {
        selectors: ["h1#ra-headline"]
    },
    author: {
        selectors: [['meta[name="parsely-author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="sailthru.date"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["article#ra-body"],
        transforms: {},
        clean: ["dl#ra-tags", ".ra-related", "a.ra-editor", "dl#ra-share-bottom"]
    }
}
  , nh = {
    domain: "www.cnbc.com",
    title: {
        selectors: ["h1.title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div#article_body.content", "div.story"],
        transforms: {},
        clean: []
    }
}
  , rh = {
    domain: "www.popsugar.com",
    title: {
        selectors: ["h2.post-title", "title-text"]
    },
    author: {
        selectors: [['meta[name="article:author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["#content"],
        transforms: {},
        clean: [".share-copy-title", ".post-tags", ".reactions"]
    }
}
  , ah = {
    domain: "observer.com",
    title: {
        selectors: ["h1.entry-title"]
    },
    author: {
        selectors: [".author", ".vcard"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: ["h2.dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.entry-content"],
        transforms: {},
        clean: []
    }
}
  , ih = {
    domain: "people.com",
    title: {
        selectors: [['meta[name="og:title"]', "value"]]
    },
    author: {
        selectors: ["a.author.url.fn"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.article-body__inner"],
        transforms: {},
        clean: []
    }
}
  , oh = {
    domain: "www.usmagazine.com",
    title: {
        selectors: ["header h1"]
    },
    author: {
        selectors: ["a.article-byline.tracked-offpage"]
    },
    date_published: {
        timezone: "America/New_York",
        selectors: ["time.article-published-date"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.article-body-inner"],
        transforms: {},
        clean: [".module-related"]
    }
}
  , sh = {
    domain: "www.rollingstone.com",
    title: {
        selectors: ["h1.content-title"]
    },
    author: {
        selectors: ["a.content-author.tracked-offpage"]
    },
    date_published: {
        selectors: ["time.content-published-date"],
        timezone: "America/New_York"
    },
    dek: {
        selectors: [".content-description"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".lead-container", ".article-content"], ".article-content"],
        transforms: {},
        clean: [".module-related"]
    }
}
  , uh = {
    domain: "247sports.com",
    title: {
        selectors: ["title", "article header h1"]
    },
    author: {
        selectors: [".author"]
    },
    date_published: {
        selectors: [["time[data-published]", "data-published"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["section.body.article"],
        transforms: {},
        clean: []
    }
}
  , ch = {
    domain: "uproxx.com",
    title: {
        selectors: ["div.post-top h1"]
    },
    author: {
        selectors: [".post-top .authorname"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".post-body"],
        transforms: {
            "div.image": "figure",
            "div.image .wp-media-credit": "figcaption"
        },
        clean: []
    }
}
  , lh = {
    domain: "www.eonline.com",
    title: {
        selectors: ["h1.article__title"]
    },
    author: {
        selectors: [".entry-meta__author a"]
    },
    date_published: {
        selectors: [['meta[itemprop="datePublished"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".post-content section, .post-content div.post-content__image"]],
        transforms: {
            "div.post-content__image": "figure",
            "div.post-content__image .image__credits": "figcaption"
        },
        clean: []
    }
}
  , fh = {
    domain: "www.miamiherald.com",
    title: {
        selectors: ["h1.title"]
    },
    date_published: {
        selectors: ["p.published-date"],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.dateline-storybody"],
        transforms: {},
        clean: []
    }
}
  , dh = {
    domain: "www.refinery29.com",
    title: {
        selectors: ["h1.title"]
    },
    author: {
        selectors: [".contributor"]
    },
    date_published: {
        selectors: [['meta[name="sailthru.date"]', "value"]],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".full-width-opener", ".article-content"], ".article-content", ".body"],
        transforms: {
            "div.loading noscript": function(e) {
                var t = e.html();
                e.parents(".loading").replaceWith(t)
            },
            ".section-image": "figure",
            ".section-image .content-caption": "figcaption",
            ".section-text": "p"
        },
        clean: [".story-share"]
    }
}
  , hh = {
    domain: "www.macrumors.com",
    title: {
        selectors: ["h1", "h1.title"]
    },
    author: {
        selectors: [".author-url"]
    },
    date_published: {
        selectors: [".article .byline"],
        format: "dddd MMMM D, YYYY h:mm A zz",
        timezone: "America/Los_Angeles"
    },
    dek: {
        selectors: [['meta[name="description"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article"],
        transforms: {},
        clean: []
    }
}
  , ph = {
    domain: "www.androidcentral.com",
    title: {
        selectors: ["h1", "h1.main-title"]
    },
    author: {
        selectors: [".meta-by"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [['meta[name="og:description"]', "value"]]
    },
    lead_image_url: {
        selectors: [[".image-large", "src"]]
    },
    content: {
        selectors: [".article-body"],
        transforms: {},
        clean: [".intro", "blockquote"]
    }
}
  , mh = {
    domain: "www.si.com",
    title: {
        selectors: ["h1", "h1.headline"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [".timestamp"],
        timezone: "America/New_York"
    },
    dek: {
        selectors: [".quick-hit ul"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["p", ".marquee_large_2x", ".component.image"]],
        transforms: {
            noscript: function(e) {
                var t = e.children();
                return 1 === t.length && "img" === t.get(0).tagName ? "figure" : null
            }
        },
        clean: [[".inline-thumb", ".primary-message", ".description", ".instructions"]]
    }
}
  , gh = {
    domain: "www.rawstory.com",
    title: {
        selectors: [".blog-title"]
    },
    author: {
        selectors: [".blog-author a:first-of-type"]
    },
    date_published: {
        selectors: [".blog-author a:last-of-type"],
        timezone: "EST"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".blog-content"],
        transforms: {},
        clean: []
    }
}
  , vh = {
    domain: "www.cnet.com",
    title: {
        selectors: [['meta[name="og:title"]', "value"]]
    },
    author: {
        selectors: ["a.author"]
    },
    date_published: {
        selectors: ["time"],
        timezone: "America/Los_Angeles"
    },
    dek: {
        selectors: [".article-dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["img.__image-lead__", ".article-main-body"], ".article-main-body"],
        transforms: {
            "figure.image": function(e) {
                var t = e.find("img");
                t.attr("width", "100%"),
                t.attr("height", "100%"),
                t.addClass("__image-lead__"),
                e.remove(".imgContainer").prepend(t)
            }
        },
        clean: []
    }
}
  , yh = {
    domain: "www.cinemablend.com",
    title: {
        selectors: [".story_title"]
    },
    author: {
        selectors: [".author"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]],
        timezone: "EST"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div#wrap_left_content"],
        transforms: {},
        clean: []
    }
}
  , bh = {
    domain: "www.today.com",
    title: {
        selectors: ["h1.entry-headline"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="DC.date.issued"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-container"],
        transforms: {},
        clean: [".label-comment"]
    }
}
  , _h = {
    domain: "www.howtogeek.com",
    title: {
        selectors: ["title"]
    },
    author: {
        selectors: ["#authorinfobox a"]
    },
    date_published: {
        selectors: ["#authorinfobox + div li"],
        timezone: "GMT"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".thecontent"],
        transforms: {},
        clean: []
    }
}
  , wh = {
    domain: "www.al.com",
    title: {
        selectors: [['meta[name="title"]', "value"]]
    },
    author: {
        selectors: [['meta[name="article_author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article_date_original"]', "value"]],
        timezone: "EST"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-content"],
        transforms: {},
        clean: []
    }
}
  , Ah = {
    domain: "www.thepennyhoarder.com",
    title: {
        selectors: [['meta[name="dcterms.title"]', "value"]]
    },
    author: {
        selectors: [['link[rel="author"]', "title"]]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".post-img", ".post-text"], ".post-text"],
        transforms: {},
        clean: []
    }
}
  , xh = {
    domain: "www.westernjournalism.com",
    title: {
        selectors: ["title", "h1.entry-title"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="DC.date.issued"]', "value"]]
    },
    dek: {
        selectors: [".subtitle"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.article-sharing.top + div"],
        transforms: {},
        clean: [".ad-notice-small"]
    }
}
  , Mh = {
    domain: "fusion.net",
    title: {
        selectors: [".post-title", ".single-title", ".headline"]
    },
    author: {
        selectors: [".show-for-medium .byline"]
    },
    date_published: {
        selectors: [["time.local-time", "datetime"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".post-featured-media", ".article-content"], ".article-content"],
        transforms: {
            ".fusion-youtube-oembed": "figure"
        },
        clean: []
    }
}
  , kh = {
    domain: "www.americanow.com",
    title: {
        selectors: [".title", ['meta[name="title"]', "value"]]
    },
    author: {
        selectors: [".byline"]
    },
    date_published: {
        selectors: [['meta[name="publish_date"]', "value"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".article-content", ".image", ".body"], ".body"],
        transforms: {},
        clean: [".article-video-wrapper", ".show-for-small-only"]
    }
}
  , Th = {
    domain: "sciencefly.com",
    title: {
        selectors: [".entry-title", ".cb-entry-title", ".cb-single-title"]
    },
    author: {
        selectors: ["div.cb-author", "div.cb-author-title"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [["div.theiaPostSlider_slides img", "src"]]
    },
    content: {
        selectors: ["div.theiaPostSlider_slides"],
        transforms: {},
        clean: []
    }
}
  , Sh = {
    domain: "hellogiggles.com",
    title: {
        selectors: [".title"]
    },
    author: {
        selectors: [".author-link"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-content"],
        transforms: {},
        clean: []
    }
}
  , Eh = {
    domain: "thoughtcatalog.com",
    title: {
        selectors: ["h1.title", ['meta[name="og:title"]', "value"]]
    },
    author: {
        selectors: ["div.col-xs-12.article_header div.writer-container.writer-container-inline.writer-no-avatar h4.writer-name", "h1.writer-name"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry.post"],
        transforms: {},
        clean: [".tc_mark"]
    }
}
  , Ch = {
    domain: "www.nj.com",
    title: {
        selectors: [['meta[name="title"]', "value"]]
    },
    author: {
        selectors: [['meta[name="article_author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="article_date_original"]', "value"]],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-content"],
        transforms: {},
        clean: []
    }
}
  , Oh = {
    domain: "www.inquisitr.com",
    title: {
        selectors: ["h1.entry-title.story--header--title"]
    },
    author: {
        selectors: ["div.story--header--author"]
    },
    date_published: {
        selectors: [['meta[name="datePublished"]', "value"]]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["article.story", ".entry-content."],
        transforms: {},
        clean: [".post-category", ".story--header--socials", ".story--header--content"]
    }
}
  , Dh = {
    domain: "www.nbcnews.com",
    title: {
        selectors: ["div.article-hed h1"]
    },
    author: {
        selectors: ["span.byline_author"]
    },
    date_published: {
        selectors: [[".flag_article-wrapper time.timestamp_article[datetime]", "datetime"], ".flag_article-wrapper time"],
        timezone: "America/New_York"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["div.article-body"],
        transforms: {},
        clean: []
    }
}
  , jh = {
    domain: "fortune.com",
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: [['meta[name="author"]', "value"]]
    },
    date_published: {
        selectors: [".MblGHNMJ"],
        timezone: "UTC"
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["picture", "article.row"], "article.row"],
        transforms: {},
        clean: []
    }
}
  , Ph = {
    domain: "www.linkedin.com",
    title: {
        selectors: [".article-title", "h1"]
    },
    author: {
        selectors: [['meta[name="article:author"]', "value"], ".entity-name a[rel=author]"]
    },
    date_published: {
        selectors: [['time[itemprop="datePublished"]', "datetime"]],
        timezone: "America/Los_Angeles"
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [["header figure", ".prose"], ".prose"],
        transforms: {},
        clean: [".entity-image"]
    }
}
  , zh = {
    domain: "obamawhitehouse.archives.gov",
    supportedDomains: ["whitehouse.gov"],
    title: {
        selectors: ["h1", ".pane-node-title"]
    },
    author: {
        selectors: [".blog-author-link", ".node-person-name-link"]
    },
    date_published: {
        selectors: [['meta[name="article:published_time"]', "value"]]
    },
    dek: {
        selectors: [".field-name-field-forall-summary"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".pane-node-field-forall-body"],
        transforms: {},
        clean: []
    }
}
  , Nh = {
    domain: "www.opposingviews.com",
    title: {
        selectors: ["h1.title"]
    },
    author: {
        selectors: ["div.date span span a"]
    },
    date_published: {
        selectors: [['meta[name="publish_date"]', "value"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-content"],
        transforms: {},
        clean: [".show-for-small-only"]
    }
}
  , Wh = {
    domain: "www.prospectmagazine.co.uk",
    title: {
        selectors: [".page-title"]
    },
    author: {
        selectors: [".aside_author .title"]
    },
    date_published: {
        selectors: [".post-info"],
        timezone: "Europe/London"
    },
    dek: {
        selectors: [".page-subtitle"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: ["article .post_content"],
        transforms: {},
        clean: []
    }
}
  , Lh = {
    domain: "forward.com",
    title: {
        selectors: [['meta[name="og:title"]', "value"]]
    },
    author: {
        selectors: [".author-name", ['meta[name="sailthru.author"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="date"]', "value"]]
    },
    dek: {
        selectors: []
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".post-item-media-wrap", ".post-item p"]],
        transforms: {},
        clean: [".donate-box", ".message", ".subtitle"]
    }
}
  , Rh = {
    domain: "www.qdaily.com",
    title: {
        selectors: ["h2", "h2.title"]
    },
    author: {
        selectors: [".name"]
    },
    date_published: {
        selectors: [[".date.smart-date", "data-origindate"]]
    },
    dek: {
        selectors: [".excerpt"]
    },
    lead_image_url: {
        selectors: [[".article-detail-hd img", "src"]]
    },
    content: {
        selectors: [".detail"],
        transforms: {},
        clean: [".lazyload", ".lazylad", ".lazylood"]
    }
}
  , qh = {
    domain: "gothamist.com",
    supportedDomains: ["chicagoist.com", "laist.com", "sfist.com", "shanghaiist.com", "dcist.com"],
    title: {
        selectors: ["h1", ".entry-header h1"]
    },
    author: {
        selectors: [".author"]
    },
    date_published: {
        selectors: ["abbr", "abbr.published"],
        timezone: "America/New_York"
    },
    dek: {
        selectors: [null]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".entry-body"],
        transforms: {
            "div.image-none": "figure",
            ".image-none i": "figcaption",
            "div.image-left": "figure",
            ".image-left i": "figcaption",
            "div.image-right": "figure",
            ".image-right i": "figcaption"
        },
        clean: [".image-none br", ".image-left br", ".image-right br", ".galleryEase"]
    }
}
  , Yh = {
    domain: "www.fool.com",
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: [".author-inline .author-name"]
    },
    date_published: {
        selectors: [['meta[name="date"]', "value"]]
    },
    dek: {
        selectors: ["header h2"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".article-content"],
        transforms: {
            ".caption img": function(e) {
                var t = e.attr("src");
                e.parent().replaceWith('<figure><img src="' + t + '"/></figure>')
            },
            ".caption": "figcaption"
        },
        clean: ["#pitch"]
    }
}
  , Bh = {
    domain: "www.slate.com",
    title: {
        selectors: [".hed", "h1"]
    },
    author: {
        selectors: ["a[rel=author]"]
    },
    date_published: {
        selectors: [".pub-date"],
        timezone: "America/New_York"
    },
    dek: {
        selectors: [".dek"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [".body"],
        transforms: {},
        clean: [".about-the-author", ".pullquote", ".newsletter-signup-component", ".top-comment"]
    }
}
  , Hh = {
    domain: "ici.radio-canada.ca",
    title: {
        selectors: ["h1"]
    },
    author: {
        selectors: [['meta[name="dc.creator"]', "value"]]
    },
    date_published: {
        selectors: [['meta[name="dc.date.created"]', "value"]],
        timezone: "America/New_York"
    },
    dek: {
        selectors: [".bunker-component.lead"]
    },
    lead_image_url: {
        selectors: [['meta[name="og:image"]', "value"]]
    },
    content: {
        selectors: [[".main-multimedia-item", ".news-story-content"]],
        transforms: {},
        clean: []
    }
}
  , Fh = Object.freeze({
    BloggerExtractor: od,
    NYMagExtractor: sd,
    WikipediaExtractor: ud,
    TwitterExtractor: cd,
    NYTimesExtractor: ld,
    TheAtlanticExtractor: fd,
    NewYorkerExtractor: dd,
    WiredExtractor: hd,
    MSNExtractor: pd,
    YahooExtractor: md,
    BuzzfeedExtractor: gd,
    WikiaExtractor: vd,
    LittleThingsExtractor: yd,
    PoliticoExtractor: bd,
    DeadspinExtractor: _d,
    BroadwayWorldExtractor: wd,
    ApartmentTherapyExtractor: Ad,
    MediumExtractor: xd,
    WwwTmzComExtractor: Md,
    WwwWashingtonpostComExtractor: kd,
    WwwHuffingtonpostComExtractor: Td,
    NewrepublicComExtractor: Sd,
    MoneyCnnComExtractor: Ed,
    WwwThevergeComExtractor: Cd,
    WwwCnnComExtractor: Od,
    WwwAolComExtractor: Dd,
    WwwYoutubeComExtractor: jd,
    WwwTheguardianComExtractor: Pd,
    WwwSbnationComExtractor: zd,
    WwwBloombergComExtractor: Nd,
    WwwBustleComExtractor: Wd,
    WwwNprOrgExtractor: Ld,
    WwwRecodeNetExtractor: Rd,
    QzComExtractor: qd,
    WwwDmagazineComExtractor: Yd,
    WwwReutersComExtractor: Bd,
    MashableComExtractor: Hd,
    WwwChicagotribuneComExtractor: Fd,
    WwwVoxComExtractor: Id,
    NewsNationalgeographicComExtractor: Ud,
    WwwNationalgeographicComExtractor: Gd,
    WwwLatimesComExtractor: $d,
    PagesixComExtractor: Vd,
    ThefederalistpapersOrgExtractor: Kd,
    WwwCbssportsComExtractor: Xd,
    WwwMsnbcComExtractor: Jd,
    WwwThepoliticalinsiderComExtractor: Zd,
    WwwMentalflossComExtractor: Qd,
    AbcnewsGoComExtractor: eh,
    WwwNydailynewsComExtractor: th,
    WwwCnbcComExtractor: nh,
    WwwPopsugarComExtractor: rh,
    ObserverComExtractor: ah,
    PeopleComExtractor: ih,
    WwwUsmagazineComExtractor: oh,
    WwwRollingstoneComExtractor: sh,
    twofortysevensportsComExtractor: uh,
    UproxxComExtractor: ch,
    WwwEonlineComExtractor: lh,
    WwwMiamiheraldComExtractor: fh,
    WwwRefinery29ComExtractor: dh,
    WwwMacrumorsComExtractor: hh,
    WwwAndroidcentralComExtractor: ph,
    WwwSiComExtractor: mh,
    WwwRawstoryComExtractor: gh,
    WwwCnetComExtractor: vh,
    WwwCinemablendComExtractor: yh,
    WwwTodayComExtractor: bh,
    WwwHowtogeekComExtractor: _h,
    WwwAlComExtractor: wh,
    WwwThepennyhoarderComExtractor: Ah,
    WwwWesternjournalismComExtractor: xh,
    FusionNetExtractor: Mh,
    WwwAmericanowComExtractor: kh,
    ScienceflyComExtractor: Th,
    HellogigglesComExtractor: Sh,
    ThoughtcatalogComExtractor: Eh,
    WwwNjComExtractor: Ch,
    WwwInquisitrComExtractor: Oh,
    WwwNbcnewsComExtractor: Dh,
    FortuneComExtractor: jh,
    WwwLinkedinComExtractor: Ph,
    ObamawhitehouseArchivesGovExtractor: zh,
    WwwOpposingviewsComExtractor: Nh,
    WwwProspectmagazineCoUkExtractor: Wh,
    ForwardComExtractor: Lh,
    WwwQdailyComExtractor: Rh,
    GothamistComExtractor: qh,
    WwwFoolComExtractor: Yh,
    WwwSlateComExtractor: Bh,
    IciRadioCanadaCaExtractor: Hh
})
  , Ih = ad(Fh).reduce(function(e, t) {
    var n = Fh[t];
    return da({}, e, Je(n))
}, {})
  , Uh = n(function(e, t) {
    (function() {
        function e(e) {
            if ("undefined" == typeof e)
                throw new Error("TypeError missing argument");
            if ("string" != typeof e)
                throw new Error("TypeError getDirection expects strings");
            if ("" === e)
                return l;
            if (e.indexOf(i) > -1 && e.indexOf(o) > -1)
                return c;
            if (e.indexOf(i) > -1)
                return s;
            if (e.indexOf(o) > -1)
                return u;
            var t = n(e, u)
              , r = n(e, s);
            return t && r ? c : r ? s : t ? u : l
        }
        function n(e, t) {
            var n, a, i, o, c = !1, l = !1, d = !1;
            for (d = e.search(/[0-9]/) > -1,
            e = e.replace(/[\s\n\0\f\t\v\'\"\-0-9\+\?\!]+/gm, ""),
            n = 0; n < e.length; n++) {
                a = e.charAt(n),
                o = !1;
                for (i in f)
                    f.hasOwnProperty(i) && r(a, f[i][0], f[i][1]) && (c = !0,
                    o = !0);
                o === !1 && (l = !0)
            }
            return t === u ? c : t === s ? l || !c && d : void 0
        }
        function r(e, t, n) {
            var r = e.charCodeAt(0)
              , a = parseInt(t, 16)
              , i = parseInt(n, 16);
            return r > a && r < i
        }
        function a() {
            String.prototype.getDirection = function() {
                return e(this.valueOf())
            }
        }
        var i = "‎"
          , o = "‏"
          , s = "ltr"
          , u = "rtl"
          , c = "bidi"
          , l = ""
          , f = {
            Hebrew: ["0590", "05FF"],
            Arabic: ["0600", "06FF"],
            NKo: ["07C0", "07FF"],
            Syriac: ["0700", "074F"],
            Thaana: ["0780", "07BF"],
            Tifinagh: ["2D30", "2D7F"]
        };
        "undefined" != typeof t ? (t.getDirection = e,
        t.patch = a) : this.stringDirection = {
            getDirection: e,
            patch: a
        }
    }
    ).call(this)
})
  , Gh = /^\s*(posted |written )?by\s*:?\s*(.*)/i
  , $h = new RegExp("http(s)?://","i")
  , Vh = /^\d{13}$/i
  , Kh = /^\d{10}$/i
  , Xh = /^\s*published\s*:?\s*(.*)/i
  , Jh = /(.*\d)(am|pm)(.*)/i
  , Zh = /\.m\./i
  , Qh = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  , ep = Qh.join("|")
  , tp = "[0-9]{1,2}:[0-9]{2,2}( ?[ap].?m.?)?"
  , np = "[0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4}"
  , rp = "-[0-9]{3,4}$"
  , ap = new RegExp("(" + tp + ")|(" + np + ")|(" + rp + ")|([0-9]{1,4})|(" + ep + ")","ig")
  , ip = /-\d{3,4}$/
  , op = /(: | - | \| )/g
  , sp = new RegExp(".com$|.net$|.org$|.co.uk$","g")
  , up = n(function(e) {
    !function(e) {
        function t(e) {
            if (e && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(e) && !/%[^0-9a-f]/i.test(e) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(e)) {
                var t = []
                  , n = ""
                  , r = ""
                  , a = ""
                  , o = ""
                  , s = ""
                  , u = "";
                if (t = i(e),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4],
                s = t[5],
                n && n.length && a.length >= 0) {
                    if (r && r.length) {
                        if (0 !== a.length && !/^\//.test(a))
                            return
                    } else if (/^\/\//.test(a))
                        return;
                    if (/^[a-z][a-z0-9\+\-\.]*$/.test(n.toLowerCase()))
                        return u += n + ":",
                        r && r.length && (u += "//" + r),
                        u += a,
                        o && o.length && (u += "?" + o),
                        s && s.length && (u += "#" + s),
                        u
                }
            }
        }
        function n(e, n) {
            if (t(e)) {
                var r = []
                  , a = ""
                  , o = ""
                  , s = ""
                  , u = ""
                  , c = ""
                  , l = ""
                  , f = "";
                if (r = i(e),
                a = r[1],
                o = r[2],
                s = r[3],
                c = r[4],
                l = r[5],
                a) {
                    if (n) {
                        if ("https" != a.toLowerCase())
                            return
                    } else if ("http" != a.toLowerCase())
                        return;
                    if (o)
                        return /:(\d+)$/.test(o) && (u = o.match(/:(\d+)$/)[0],
                        o = o.replace(/:\d+$/, "")),
                        f += a + ":",
                        f += "//" + o,
                        u && (f += u),
                        f += s,
                        c && c.length && (f += "?" + c),
                        l && l.length && (f += "#" + l),
                        f
                }
            }
        }
        function r(e) {
            return n(e, !0)
        }
        function a(e) {
            return n(e) || r(e)
        }
        e.exports.is_uri = t,
        e.exports.is_http_uri = n,
        e.exports.is_https_uri = r,
        e.exports.is_web_uri = a,
        e.exports.isUri = t,
        e.exports.isHttpUri = n,
        e.exports.isHttpsUri = r,
        e.exports.isWebUri = a;
        var i = function(e) {
            var t = e.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
            return t
        }
    }(e)
})
  , cp = n(function(t, n) {
    !function(e, r) {
        "object" == typeof n && "undefined" != typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define(r) : e.moment = r()
    }(this, function() {
        function n() {
            return vr.apply(null, arguments)
        }
        function r(e) {
            vr = e
        }
        function a(e) {
            return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
        }
        function i(e) {
            return null != e && "[object Object]" === Object.prototype.toString.call(e)
        }
        function o(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }
        function s(e) {
            return "number" == typeof value || "[object Number]" === Object.prototype.toString.call(e)
        }
        function u(e) {
            return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
        }
        function c(e, t) {
            var n, r = [];
            for (n = 0; n < e.length; ++n)
                r.push(t(e[n], n));
            return r
        }
        function l(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        function f(e, t) {
            for (var n in t)
                l(t, n) && (e[n] = t[n]);
            return l(t, "toString") && (e.toString = t.toString),
            l(t, "valueOf") && (e.valueOf = t.valueOf),
            e
        }
        function d(e, t, n, r) {
            return bt(e, t, n, r, !0).utc()
        }
        function h() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null
            }
        }
        function p(e) {
            return null == e._pf && (e._pf = h()),
            e._pf
        }
        function m(e) {
            if (null == e._isValid) {
                var t = p(e)
                  , n = br.call(t.parsedDateParts, function(e) {
                    return null != e
                })
                  , r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
                if (e._strict && (r = r && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour),
                null != Object.isFrozen && Object.isFrozen(e))
                    return r;
                e._isValid = r
            }
            return e._isValid
        }
        function g(e) {
            var t = d(NaN);
            return null != e ? f(p(t), e) : p(t).userInvalidated = !0,
            t
        }
        function v(e) {
            return void 0 === e
        }
        function y(e, t) {
            var n, r, a;
            if (v(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
            v(t._i) || (e._i = t._i),
            v(t._f) || (e._f = t._f),
            v(t._l) || (e._l = t._l),
            v(t._strict) || (e._strict = t._strict),
            v(t._tzm) || (e._tzm = t._tzm),
            v(t._isUTC) || (e._isUTC = t._isUTC),
            v(t._offset) || (e._offset = t._offset),
            v(t._pf) || (e._pf = p(t)),
            v(t._locale) || (e._locale = t._locale),
            _r.length > 0)
                for (n in _r)
                    r = _r[n],
                    a = t[r],
                    v(a) || (e[r] = a);
            return e
        }
        function b(e) {
            y(this, e),
            this._d = new Date(null != e._d ? e._d.getTime() : NaN),
            wr === !1 && (wr = !0,
            n.updateOffset(this),
            wr = !1)
        }
        function _(e) {
            return e instanceof b || null != e && null != e._isAMomentObject
        }
        function w(e) {
            return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
        }
        function A(e) {
            var t = +e
              , n = 0;
            return 0 !== t && isFinite(t) && (n = w(t)),
            n
        }
        function x(e, t, n) {
            var r, a = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), o = 0;
            for (r = 0; r < a; r++)
                (n && e[r] !== t[r] || !n && A(e[r]) !== A(t[r])) && o++;
            return o + i
        }
        function M(e) {
            n.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }
        function k(e, t) {
            var r = !0;
            return f(function() {
                if (null != n.deprecationHandler && n.deprecationHandler(null, e),
                r) {
                    for (var a, i = [], o = 0; o < arguments.length; o++) {
                        if (a = "",
                        "object" == typeof arguments[o]) {
                            a += "\n[" + o + "] ";
                            for (var s in arguments[0])
                                a += s + ": " + arguments[0][s] + ", ";
                            a = a.slice(0, -2)
                        } else
                            a = arguments[o];
                        i.push(a)
                    }
                    M(e + "\nArguments: " + Array.prototype.slice.call(i).join("") + "\n" + (new Error).stack),
                    r = !1
                }
                return t.apply(this, arguments)
            }, t)
        }
        function T(e, t) {
            null != n.deprecationHandler && n.deprecationHandler(e, t),
            Ar[e] || (M(t),
            Ar[e] = !0)
        }
        function S(e) {
            return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
        }
        function E(e) {
            var t, n;
            for (n in e)
                t = e[n],
                S(t) ? this[n] = t : this["_" + n] = t;
            this._config = e,
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        }
        function C(e, t) {
            var n, r = f({}, e);
            for (n in t)
                l(t, n) && (i(e[n]) && i(t[n]) ? (r[n] = {},
                f(r[n], e[n]),
                f(r[n], t[n])) : null != t[n] ? r[n] = t[n] : delete r[n]);
            for (n in e)
                l(e, n) && !l(t, n) && i(e[n]) && (r[n] = f({}, r[n]));
            return r
        }
        function O(e) {
            null != e && this.set(e)
        }
        function D(e, t, n) {
            var r = this._calendar[e] || this._calendar.sameElse;
            return S(r) ? r.call(t, n) : r
        }
        function j(e) {
            var t = this._longDateFormat[e]
              , n = this._longDateFormat[e.toUpperCase()];
            return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1)
            }),
            this._longDateFormat[e])
        }
        function P() {
            return this._invalidDate
        }
        function z(e) {
            return this._ordinal.replace("%d", e)
        }
        function N(e, t, n, r) {
            var a = this._relativeTime[n];
            return S(a) ? a(e, t, n, r) : a.replace(/%d/i, e)
        }
        function W(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return S(n) ? n(t) : n.replace(/%s/i, t)
        }
        function L(e, t) {
            var n = e.toLowerCase();
            jr[n] = jr[n + "s"] = jr[t] = e
        }
        function R(e) {
            return "string" == typeof e ? jr[e] || jr[e.toLowerCase()] : void 0
        }
        function q(e) {
            var t, n, r = {};
            for (n in e)
                l(e, n) && (t = R(n),
                t && (r[t] = e[n]));
            return r
        }
        function Y(e, t) {
            Pr[e] = t
        }
        function B(e) {
            var t = [];
            for (var n in e)
                t.push({
                    unit: n,
                    priority: Pr[n]
                });
            return t.sort(function(e, t) {
                return e.priority - t.priority
            }),
            t
        }
        function H(e, t) {
            return function(r) {
                return null != r ? (I(this, e, r),
                n.updateOffset(this, t),
                this) : F(this, e)
            }
        }
        function F(e, t) {
            return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
        }
        function I(e, t, n) {
            e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
        }
        function U(e) {
            return e = R(e),
            S(this[e]) ? this[e]() : this
        }
        function G(e, t) {
            if ("object" == typeof e) {
                e = q(e);
                for (var n = B(e), r = 0; r < n.length; r++)
                    this[n[r].unit](e[n[r].unit])
            } else if (e = R(e),
            S(this[e]))
                return this[e](t);
            return this
        }
        function $(e, t, n) {
            var r = "" + Math.abs(e)
              , a = t - r.length
              , i = e >= 0;
            return (i ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r
        }
        function V(e, t, n, r) {
            var a = r;
            "string" == typeof r && (a = function() {
                return this[r]()
            }
            ),
            e && (Lr[e] = a),
            t && (Lr[t[0]] = function() {
                return $(a.apply(this, arguments), t[1], t[2])
            }
            ),
            n && (Lr[n] = function() {
                return this.localeData().ordinal(a.apply(this, arguments), e)
            }
            )
        }
        function K(e) {
            return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
        }
        function X(e) {
            var t, n, r = e.match(zr);
            for (t = 0,
            n = r.length; t < n; t++)
                Lr[r[t]] ? r[t] = Lr[r[t]] : r[t] = K(r[t]);
            return function(t) {
                var a, i = "";
                for (a = 0; a < n; a++)
                    i += r[a]instanceof Function ? r[a].call(t, e) : r[a];
                return i
            }
        }
        function J(e, t) {
            return e.isValid() ? (t = Z(t, e.localeData()),
            Wr[t] = Wr[t] || X(t),
            Wr[t](e)) : e.localeData().invalidDate()
        }
        function Z(e, t) {
            function n(e) {
                return t.longDateFormat(e) || e
            }
            var r = 5;
            for (Nr.lastIndex = 0; r >= 0 && Nr.test(e); )
                e = e.replace(Nr, n),
                Nr.lastIndex = 0,
                r -= 1;
            return e
        }
        function Q(e, t, n) {
            ta[e] = S(t) ? t : function(e, r) {
                return e && n ? n : t
            }
        }
        function ee(e, t) {
            return l(ta, e) ? ta[e](t._strict, t._locale) : new RegExp(te(e))
        }
        function te(e) {
            return ne(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, a) {
                return t || n || r || a
            }))
        }
        function ne(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }
        function re(e, t) {
            var n, r = t;
            for ("string" == typeof e && (e = [e]),
            s(t) && (r = function(e, n) {
                n[t] = A(e)
            }
            ),
            n = 0; n < e.length; n++)
                na[e[n]] = r
        }
        function ae(e, t) {
            re(e, function(e, n, r, a) {
                r._w = r._w || {},
                t(e, r._w, r, a)
            })
        }
        function ie(e, t, n) {
            null != t && l(na, e) && na[e](t, n._a, n, e)
        }
        function oe(e, t) {
            return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
        }
        function se(e, t) {
            return e ? a(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || ha).test(t) ? "format" : "standalone"][e.month()] : this._months
        }
        function ue(e, t) {
            return e ? a(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[ha.test(t) ? "format" : "standalone"][e.month()] : this._monthsShort
        }
        function ce(e, t, n) {
            var r, a, i, o = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = [],
                r = 0; r < 12; ++r)
                    i = d([2e3, r]),
                    this._shortMonthsParse[r] = this.monthsShort(i, "").toLocaleLowerCase(),
                    this._longMonthsParse[r] = this.months(i, "").toLocaleLowerCase();
            return n ? "MMM" === t ? (a = da.call(this._shortMonthsParse, o),
            a !== -1 ? a : null) : (a = da.call(this._longMonthsParse, o),
            a !== -1 ? a : null) : "MMM" === t ? (a = da.call(this._shortMonthsParse, o),
            a !== -1 ? a : (a = da.call(this._longMonthsParse, o),
            a !== -1 ? a : null)) : (a = da.call(this._longMonthsParse, o),
            a !== -1 ? a : (a = da.call(this._shortMonthsParse, o),
            a !== -1 ? a : null))
        }
        function le(e, t, n) {
            var r, a, i;
            if (this._monthsParseExact)
                return ce.call(this, e, t, n);
            for (this._monthsParse || (this._monthsParse = [],
            this._longMonthsParse = [],
            this._shortMonthsParse = []),
            r = 0; r < 12; r++) {
                if (a = d([2e3, r]),
                n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(a, "").replace(".", "") + "$","i"),
                this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$","i")),
                n || this._monthsParse[r] || (i = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""),
                this._monthsParse[r] = new RegExp(i.replace(".", ""),"i")),
                n && "MMMM" === t && this._longMonthsParse[r].test(e))
                    return r;
                if (n && "MMM" === t && this._shortMonthsParse[r].test(e))
                    return r;
                if (!n && this._monthsParse[r].test(e))
                    return r
            }
        }
        function fe(e, t) {
            var n;
            if (!e.isValid())
                return e;
            if ("string" == typeof t)
                if (/^\d+$/.test(t))
                    t = A(t);
                else if (t = e.localeData().monthsParse(t),
                !s(t))
                    return e;
            return n = Math.min(e.date(), oe(e.year(), t)),
            e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
            e
        }
        function de(e) {
            return null != e ? (fe(this, e),
            n.updateOffset(this, !0),
            this) : F(this, "Month")
        }
        function he() {
            return oe(this.year(), this.month())
        }
        function pe(e) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || ge.call(this),
            e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = ga),
            this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }
        function me(e) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || ge.call(this),
            e ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = va),
            this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
        }
        function ge() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, n, r = [], a = [], i = [];
            for (t = 0; t < 12; t++)
                n = d([2e3, t]),
                r.push(this.monthsShort(n, "")),
                a.push(this.months(n, "")),
                i.push(this.months(n, "")),
                i.push(this.monthsShort(n, ""));
            for (r.sort(e),
            a.sort(e),
            i.sort(e),
            t = 0; t < 12; t++)
                r[t] = ne(r[t]),
                a[t] = ne(a[t]);
            for (t = 0; t < 24; t++)
                i[t] = ne(i[t]);
            this._monthsRegex = new RegExp("^(" + i.join("|") + ")","i"),
            this._monthsShortRegex = this._monthsRegex,
            this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")","i"),
            this._monthsShortStrictRegex = new RegExp("^(" + r.join("|") + ")","i")
        }
        function ve(e) {
            return ye(e) ? 366 : 365
        }
        function ye(e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        }
        function be() {
            return ye(this.year())
        }
        function _e(e, t, n, r, a, i, o) {
            var s = new Date(e,t,n,r,a,i,o);
            return e < 100 && e >= 0 && isFinite(s.getFullYear()) && s.setFullYear(e),
            s
        }
        function we(e) {
            var t = new Date(Date.UTC.apply(null, arguments));
            return e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e),
            t
        }
        function Ae(e, t, n) {
            var r = 7 + t - n
              , a = (7 + we(e, 0, r).getUTCDay() - t) % 7;
            return -a + r - 1
        }
        function xe(e, t, n, r, a) {
            var i, o, s = (7 + n - r) % 7, u = Ae(e, r, a), c = 1 + 7 * (t - 1) + s + u;
            return c <= 0 ? (i = e - 1,
            o = ve(i) + c) : c > ve(e) ? (i = e + 1,
            o = c - ve(e)) : (i = e,
            o = c),
            {
                year: i,
                dayOfYear: o
            }
        }
        function Me(e, t, n) {
            var r, a, i = Ae(e.year(), t, n), o = Math.floor((e.dayOfYear() - i - 1) / 7) + 1;
            return o < 1 ? (a = e.year() - 1,
            r = o + ke(a, t, n)) : o > ke(e.year(), t, n) ? (r = o - ke(e.year(), t, n),
            a = e.year() + 1) : (a = e.year(),
            r = o),
            {
                week: r,
                year: a
            }
        }
        function ke(e, t, n) {
            var r = Ae(e, t, n)
              , a = Ae(e + 1, t, n);
            return (ve(e) - r + a) / 7
        }
        function Te(e) {
            return Me(e, this._week.dow, this._week.doy).week
        }
        function Se() {
            return this._week.dow
        }
        function Ee() {
            return this._week.doy
        }
        function Ce(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d")
        }
        function Oe(e) {
            var t = Me(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d")
        }
        function De(e, t) {
            return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e),
            "number" == typeof e ? e : null) : parseInt(e, 10)
        }
        function je(e, t) {
            return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
        }
        function Pe(e, t) {
            return e ? a(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : this._weekdays
        }
        function ze(e) {
            return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
        }
        function Ne(e) {
            return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
        }
        function We(e, t, n) {
            var r, a, i, o = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._minWeekdaysParse = [],
                r = 0; r < 7; ++r)
                    i = d([2e3, 1]).day(r),
                    this._minWeekdaysParse[r] = this.weekdaysMin(i, "").toLocaleLowerCase(),
                    this._shortWeekdaysParse[r] = this.weekdaysShort(i, "").toLocaleLowerCase(),
                    this._weekdaysParse[r] = this.weekdays(i, "").toLocaleLowerCase();
            return n ? "dddd" === t ? (a = da.call(this._weekdaysParse, o),
            a !== -1 ? a : null) : "ddd" === t ? (a = da.call(this._shortWeekdaysParse, o),
            a !== -1 ? a : null) : (a = da.call(this._minWeekdaysParse, o),
            a !== -1 ? a : null) : "dddd" === t ? (a = da.call(this._weekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._shortWeekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._minWeekdaysParse, o),
            a !== -1 ? a : null))) : "ddd" === t ? (a = da.call(this._shortWeekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._weekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._minWeekdaysParse, o),
            a !== -1 ? a : null))) : (a = da.call(this._minWeekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._weekdaysParse, o),
            a !== -1 ? a : (a = da.call(this._shortWeekdaysParse, o),
            a !== -1 ? a : null)))
        }
        function Le(e, t, n) {
            var r, a, i;
            if (this._weekdaysParseExact)
                return We.call(this, e, t, n);
            for (this._weekdaysParse || (this._weekdaysParse = [],
            this._minWeekdaysParse = [],
            this._shortWeekdaysParse = [],
            this._fullWeekdaysParse = []),
            r = 0; r < 7; r++) {
                if (a = d([2e3, 1]).day(r),
                n && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp("^" + this.weekdays(a, "").replace(".", ".?") + "$","i"),
                this._shortWeekdaysParse[r] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", ".?") + "$","i"),
                this._minWeekdaysParse[r] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", ".?") + "$","i")),
                this._weekdaysParse[r] || (i = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""),
                this._weekdaysParse[r] = new RegExp(i.replace(".", ""),"i")),
                n && "dddd" === t && this._fullWeekdaysParse[r].test(e))
                    return r;
                if (n && "ddd" === t && this._shortWeekdaysParse[r].test(e))
                    return r;
                if (n && "dd" === t && this._minWeekdaysParse[r].test(e))
                    return r;
                if (!n && this._weekdaysParse[r].test(e))
                    return r
            }
        }
        function Re(e) {
            if (!this.isValid())
                return null != e ? this : NaN;
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = De(e, this.localeData()),
            this.add(e - t, "d")) : t
        }
        function qe(e) {
            if (!this.isValid())
                return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d")
        }
        function Ye(e) {
            if (!this.isValid())
                return null != e ? this : NaN;
            if (null != e) {
                var t = je(e, this.localeData());
                return this.day(this.day() % 7 ? t : t - 7)
            }
            return this.day() || 7
        }
        function Be(e) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ie.call(this),
            e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = xa),
            this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }
        function He(e) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ie.call(this),
            e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ma),
            this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }
        function Fe(e) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ie.call(this),
            e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ka),
            this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }
        function Ie() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, n, r, a, i, o = [], s = [], u = [], c = [];
            for (t = 0; t < 7; t++)
                n = d([2e3, 1]).day(t),
                r = this.weekdaysMin(n, ""),
                a = this.weekdaysShort(n, ""),
                i = this.weekdays(n, ""),
                o.push(r),
                s.push(a),
                u.push(i),
                c.push(r),
                c.push(a),
                c.push(i);
            for (o.sort(e),
            s.sort(e),
            u.sort(e),
            c.sort(e),
            t = 0; t < 7; t++)
                s[t] = ne(s[t]),
                u[t] = ne(u[t]),
                c[t] = ne(c[t]);
            this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")","i"),
            this._weekdaysShortRegex = this._weekdaysRegex,
            this._weekdaysMinRegex = this._weekdaysRegex,
            this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")","i"),
            this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")","i"),
            this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")","i")
        }
        function Ue() {
            return this.hours() % 12 || 12
        }
        function Ge() {
            return this.hours() || 24
        }
        function $e(e, t) {
            V(e, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), t)
            })
        }
        function Ve(e, t) {
            return t._meridiemParse
        }
        function Ke(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        }
        function Xe(e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        }
        function Je(e) {
            return e ? e.toLowerCase().replace("_", "-") : e
        }
        function Ze(e) {
            for (var t, n, r, a, i = 0; i < e.length; ) {
                for (a = Je(e[i]).split("-"),
                t = a.length,
                n = Je(e[i + 1]),
                n = n ? n.split("-") : null; t > 0; ) {
                    if (r = Qe(a.slice(0, t).join("-")))
                        return r;
                    if (n && n.length >= t && x(a, n, !0) >= t - 1)
                        break;
                    t--
                }
                i++
            }
            return null
        }
        function Qe(n) {
            var r = null;
            if (!Oa[n] && "undefined" != typeof t && t && t.exports)
                try {
                    r = Ta._abbr,
                    e("./locale/" + n),
                    et(r)
                } catch (e) {}
            return Oa[n]
        }
        function et(e, t) {
            var n;
            return e && (n = v(t) ? rt(e) : tt(e, t),
            n && (Ta = n)),
            Ta._abbr
        }
        function tt(e, t) {
            if (null !== t) {
                var n = Ca;
                if (t.abbr = e,
                null != Oa[e])
                    T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
                    n = Oa[e]._config;
                else if (null != t.parentLocale) {
                    if (null == Oa[t.parentLocale])
                        return Da[t.parentLocale] || (Da[t.parentLocale] = []),
                        Da[t.parentLocale].push({
                            name: e,
                            config: t
                        }),
                        null;
                    n = Oa[t.parentLocale]._config
                }
                return Oa[e] = new O(C(n, t)),
                Da[e] && Da[e].forEach(function(e) {
                    tt(e.name, e.config)
                }),
                et(e),
                Oa[e]
            }
            return delete Oa[e],
            null
        }
        function nt(e, t) {
            if (null != t) {
                var n, r = Ca;
                null != Oa[e] && (r = Oa[e]._config),
                t = C(r, t),
                n = new O(t),
                n.parentLocale = Oa[e],
                Oa[e] = n,
                et(e)
            } else
                null != Oa[e] && (null != Oa[e].parentLocale ? Oa[e] = Oa[e].parentLocale : null != Oa[e] && delete Oa[e]);
            return Oa[e]
        }
        function rt(e) {
            var t;
            if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
            !e)
                return Ta;
            if (!a(e)) {
                if (t = Qe(e))
                    return t;
                e = [e]
            }
            return Ze(e)
        }
        function at() {
            return kr(Oa)
        }
        function it(e) {
            var t, n = e._a;
            return n && p(e).overflow === -2 && (t = n[aa] < 0 || n[aa] > 11 ? aa : n[ia] < 1 || n[ia] > oe(n[ra], n[aa]) ? ia : n[oa] < 0 || n[oa] > 24 || 24 === n[oa] && (0 !== n[sa] || 0 !== n[ua] || 0 !== n[ca]) ? oa : n[sa] < 0 || n[sa] > 59 ? sa : n[ua] < 0 || n[ua] > 59 ? ua : n[ca] < 0 || n[ca] > 999 ? ca : -1,
            p(e)._overflowDayOfYear && (t < ra || t > ia) && (t = ia),
            p(e)._overflowWeeks && t === -1 && (t = la),
            p(e)._overflowWeekday && t === -1 && (t = fa),
            p(e).overflow = t),
            e
        }
        function ot(e) {
            var t, n, r, a, i, o, s = e._i, u = ja.exec(s) || Pa.exec(s);
            if (u) {
                for (p(e).iso = !0,
                t = 0,
                n = Na.length; t < n; t++)
                    if (Na[t][1].exec(u[1])) {
                        a = Na[t][0],
                        r = Na[t][2] !== !1;
                        break
                    }
                if (null == a)
                    return void (e._isValid = !1);
                if (u[3]) {
                    for (t = 0,
                    n = Wa.length; t < n; t++)
                        if (Wa[t][1].exec(u[3])) {
                            i = (u[2] || " ") + Wa[t][0];
                            break
                        }
                    if (null == i)
                        return void (e._isValid = !1)
                }
                if (!r && null != i)
                    return void (e._isValid = !1);
                if (u[4]) {
                    if (!za.exec(u[4]))
                        return void (e._isValid = !1);
                    o = "Z"
                }
                e._f = a + (i || "") + (o || ""),
                dt(e)
            } else
                e._isValid = !1
        }
        function st(e) {
            var t = La.exec(e._i);
            return null !== t ? void (e._d = new Date(+t[1])) : (ot(e),
            void (e._isValid === !1 && (delete e._isValid,
            n.createFromInputFallback(e))))
        }
        function ut(e, t, n) {
            return null != e ? e : null != t ? t : n
        }
        function ct(e) {
            var t = new Date(n.now());
            return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
        }
        function lt(e) {
            var t, n, r, a, i = [];
            if (!e._d) {
                for (r = ct(e),
                e._w && null == e._a[ia] && null == e._a[aa] && ft(e),
                e._dayOfYear && (a = ut(e._a[ra], r[ra]),
                e._dayOfYear > ve(a) && (p(e)._overflowDayOfYear = !0),
                n = we(a, 0, e._dayOfYear),
                e._a[aa] = n.getUTCMonth(),
                e._a[ia] = n.getUTCDate()),
                t = 0; t < 3 && null == e._a[t]; ++t)
                    e._a[t] = i[t] = r[t];
                for (; t < 7; t++)
                    e._a[t] = i[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                24 === e._a[oa] && 0 === e._a[sa] && 0 === e._a[ua] && 0 === e._a[ca] && (e._nextDay = !0,
                e._a[oa] = 0),
                e._d = (e._useUTC ? we : _e).apply(null, i),
                null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                e._nextDay && (e._a[oa] = 24)
            }
        }
        function ft(e) {
            var t, n, r, a, i, o, s, u;
            if (t = e._w,
            null != t.GG || null != t.W || null != t.E)
                i = 1,
                o = 4,
                n = ut(t.GG, e._a[ra], Me(_t(), 1, 4).year),
                r = ut(t.W, 1),
                a = ut(t.E, 1),
                (a < 1 || a > 7) && (u = !0);
            else {
                i = e._locale._week.dow,
                o = e._locale._week.doy;
                var c = Me(_t(), i, o);
                n = ut(t.gg, e._a[ra], c.year),
                r = ut(t.w, c.week),
                null != t.d ? (a = t.d,
                (a < 0 || a > 6) && (u = !0)) : null != t.e ? (a = t.e + i,
                (t.e < 0 || t.e > 6) && (u = !0)) : a = i
            }
            r < 1 || r > ke(n, i, o) ? p(e)._overflowWeeks = !0 : null != u ? p(e)._overflowWeekday = !0 : (s = xe(n, r, a, i, o),
            e._a[ra] = s.year,
            e._dayOfYear = s.dayOfYear)
        }
        function dt(e) {
            if (e._f === n.ISO_8601)
                return void ot(e);
            e._a = [],
            p(e).empty = !0;
            var t, r, a, i, o, s = "" + e._i, u = s.length, c = 0;
            for (a = Z(e._f, e._locale).match(zr) || [],
            t = 0; t < a.length; t++)
                i = a[t],
                r = (s.match(ee(i, e)) || [])[0],
                r && (o = s.substr(0, s.indexOf(r)),
                o.length > 0 && p(e).unusedInput.push(o),
                s = s.slice(s.indexOf(r) + r.length),
                c += r.length),
                Lr[i] ? (r ? p(e).empty = !1 : p(e).unusedTokens.push(i),
                ie(i, r, e)) : e._strict && !r && p(e).unusedTokens.push(i);
            p(e).charsLeftOver = u - c,
            s.length > 0 && p(e).unusedInput.push(s),
            e._a[oa] <= 12 && p(e).bigHour === !0 && e._a[oa] > 0 && (p(e).bigHour = void 0),
            p(e).parsedDateParts = e._a.slice(0),
            p(e).meridiem = e._meridiem,
            e._a[oa] = ht(e._locale, e._a[oa], e._meridiem),
            lt(e),
            it(e)
        }
        function ht(e, t, n) {
            var r;
            return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n),
            r && t < 12 && (t += 12),
            r || 12 !== t || (t = 0),
            t) : t
        }
        function pt(e) {
            var t, n, r, a, i;
            if (0 === e._f.length)
                return p(e).invalidFormat = !0,
                void (e._d = new Date(NaN));
            for (a = 0; a < e._f.length; a++)
                i = 0,
                t = y({}, e),
                null != e._useUTC && (t._useUTC = e._useUTC),
                t._f = e._f[a],
                dt(t),
                m(t) && (i += p(t).charsLeftOver,
                i += 10 * p(t).unusedTokens.length,
                p(t).score = i,
                (null == r || i < r) && (r = i,
                n = t));
            f(e, n || t)
        }
        function mt(e) {
            if (!e._d) {
                var t = q(e._i);
                e._a = c([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                    return e && parseInt(e, 10)
                }),
                lt(e)
            }
        }
        function gt(e) {
            var t = new b(it(vt(e)));
            return t._nextDay && (t.add(1, "d"),
            t._nextDay = void 0),
            t
        }
        function vt(e) {
            var t = e._i
              , n = e._f;
            return e._locale = e._locale || rt(e._l),
            null === t || void 0 === n && "" === t ? g({
                nullInput: !0
            }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
            _(t) ? new b(it(t)) : (u(t) ? e._d = t : a(n) ? pt(e) : n ? dt(e) : yt(e),
            m(e) || (e._d = null),
            e))
        }
        function yt(e) {
            var t = e._i;
            void 0 === t ? e._d = new Date(n.now()) : u(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? st(e) : a(t) ? (e._a = c(t.slice(0), function(e) {
                return parseInt(e, 10)
            }),
            lt(e)) : "object" == typeof t ? mt(e) : s(t) ? e._d = new Date(t) : n.createFromInputFallback(e)
        }
        function bt(e, t, n, r, s) {
            var u = {};
            return n !== !0 && n !== !1 || (r = n,
            n = void 0),
            (i(e) && o(e) || a(e) && 0 === e.length) && (e = void 0),
            u._isAMomentObject = !0,
            u._useUTC = u._isUTC = s,
            u._l = n,
            u._i = e,
            u._f = t,
            u._strict = r,
            gt(u)
        }
        function _t(e, t, n, r) {
            return bt(e, t, n, r, !1)
        }
        function wt(e, t) {
            var n, r;
            if (1 === t.length && a(t[0]) && (t = t[0]),
            !t.length)
                return _t();
            for (n = t[0],
            r = 1; r < t.length; ++r)
                t[r].isValid() && !t[r][e](n) || (n = t[r]);
            return n
        }
        function At() {
            var e = [].slice.call(arguments, 0);
            return wt("isBefore", e)
        }
        function xt() {
            var e = [].slice.call(arguments, 0);
            return wt("isAfter", e)
        }
        function Mt(e) {
            var t = q(e)
              , n = t.year || 0
              , r = t.quarter || 0
              , a = t.month || 0
              , i = t.week || 0
              , o = t.day || 0
              , s = t.hour || 0
              , u = t.minute || 0
              , c = t.second || 0
              , l = t.millisecond || 0;
            this._milliseconds = +l + 1e3 * c + 6e4 * u + 1e3 * s * 60 * 60,
            this._days = +o + 7 * i,
            this._months = +a + 3 * r + 12 * n,
            this._data = {},
            this._locale = rt(),
            this._bubble()
        }
        function kt(e) {
            return e instanceof Mt
        }
        function Tt(e) {
            return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e)
        }
        function St(e, t) {
            V(e, 0, 0, function() {
                var e = this.utcOffset()
                  , n = "+";
                return e < 0 && (e = -e,
                n = "-"),
                n + $(~~(e / 60), 2) + t + $(~~e % 60, 2)
            })
        }
        function Et(e, t) {
            var n = (t || "").match(e);
            if (null === n)
                return null;
            var r = n[n.length - 1] || []
              , a = (r + "").match(Ba) || ["-", 0, 0]
              , i = +(60 * a[1]) + A(a[2]);
            return 0 === i ? 0 : "+" === a[0] ? i : -i
        }
        function Ct(e, t) {
            var r, a;
            return t._isUTC ? (r = t.clone(),
            a = (_(e) || u(e) ? e.valueOf() : _t(e).valueOf()) - r.valueOf(),
            r._d.setTime(r._d.valueOf() + a),
            n.updateOffset(r, !1),
            r) : _t(e).local()
        }
        function Ot(e) {
            return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
        }
        function Dt(e, t) {
            var r, a = this._offset || 0;
            if (!this.isValid())
                return null != e ? this : NaN;
            if (null != e) {
                if ("string" == typeof e) {
                    if (e = Et(Zr, e),
                    null === e)
                        return this
                } else
                    Math.abs(e) < 16 && (e *= 60);
                return !this._isUTC && t && (r = Ot(this)),
                this._offset = e,
                this._isUTC = !0,
                null != r && this.add(r, "m"),
                a !== e && (!t || this._changeInProgress ? $t(this, Ht(e - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                n.updateOffset(this, !0),
                this._changeInProgress = null)),
                this
            }
            return this._isUTC ? a : Ot(this)
        }
        function jt(e, t) {
            return null != e ? ("string" != typeof e && (e = -e),
            this.utcOffset(e, t),
            this) : -this.utcOffset()
        }
        function Pt(e) {
            return this.utcOffset(0, e)
        }
        function zt(e) {
            return this._isUTC && (this.utcOffset(0, e),
            this._isUTC = !1,
            e && this.subtract(Ot(this), "m")),
            this
        }
        function Nt() {
            if (null != this._tzm)
                this.utcOffset(this._tzm);
            else if ("string" == typeof this._i) {
                var e = Et(Jr, this._i);
                null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
            }
            return this
        }
        function Wt(e) {
            return !!this.isValid() && (e = e ? _t(e).utcOffset() : 0,
            (this.utcOffset() - e) % 60 === 0)
        }
        function Lt() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }
        function Rt() {
            if (!v(this._isDSTShifted))
                return this._isDSTShifted;
            var e = {};
            if (y(e, this),
            e = vt(e),
            e._a) {
                var t = e._isUTC ? d(e._a) : _t(e._a);
                this._isDSTShifted = this.isValid() && x(e._a, t.toArray()) > 0
            } else
                this._isDSTShifted = !1;
            return this._isDSTShifted
        }
        function qt() {
            return !!this.isValid() && !this._isUTC
        }
        function Yt() {
            return !!this.isValid() && this._isUTC
        }
        function Bt() {
            return !!this.isValid() && (this._isUTC && 0 === this._offset)
        }
        function Ht(e, t) {
            var n, r, a, i = e, o = null;
            return kt(e) ? i = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            } : s(e) ? (i = {},
            t ? i[t] = e : i.milliseconds = e) : (o = Ha.exec(e)) ? (n = "-" === o[1] ? -1 : 1,
            i = {
                y: 0,
                d: A(o[ia]) * n,
                h: A(o[oa]) * n,
                m: A(o[sa]) * n,
                s: A(o[ua]) * n,
                ms: A(Tt(1e3 * o[ca])) * n
            }) : (o = Fa.exec(e)) ? (n = "-" === o[1] ? -1 : 1,
            i = {
                y: Ft(o[2], n),
                M: Ft(o[3], n),
                w: Ft(o[4], n),
                d: Ft(o[5], n),
                h: Ft(o[6], n),
                m: Ft(o[7], n),
                s: Ft(o[8], n)
            }) : null == i ? i = {} : "object" == typeof i && ("from"in i || "to"in i) && (a = Ut(_t(i.from), _t(i.to)),
            i = {},
            i.ms = a.milliseconds,
            i.M = a.months),
            r = new Mt(i),
            kt(e) && l(e, "_locale") && (r._locale = e._locale),
            r
        }
        function Ft(e, t) {
            var n = e && parseFloat(e.replace(",", "."));
            return (isNaN(n) ? 0 : n) * t
        }
        function It(e, t) {
            var n = {
                milliseconds: 0,
                months: 0
            };
            return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
            e.clone().add(n.months, "M").isAfter(t) && --n.months,
            n.milliseconds = +t - +e.clone().add(n.months, "M"),
            n
        }
        function Ut(e, t) {
            var n;
            return e.isValid() && t.isValid() ? (t = Ct(t, e),
            e.isBefore(t) ? n = It(e, t) : (n = It(t, e),
            n.milliseconds = -n.milliseconds,
            n.months = -n.months),
            n) : {
                milliseconds: 0,
                months: 0
            }
        }
        function Gt(e, t) {
            return function(n, r) {
                var a, i;
                return null === r || isNaN(+r) || (T(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
                i = n,
                n = r,
                r = i),
                n = "string" == typeof n ? +n : n,
                a = Ht(n, r),
                $t(this, a, e),
                this
            }
        }
        function $t(e, t, r, a) {
            var i = t._milliseconds
              , o = Tt(t._days)
              , s = Tt(t._months);
            e.isValid() && (a = null == a || a,
            i && e._d.setTime(e._d.valueOf() + i * r),
            o && I(e, "Date", F(e, "Date") + o * r),
            s && fe(e, F(e, "Month") + s * r),
            a && n.updateOffset(e, o || s))
        }
        function Vt(e, t) {
            var n = e.diff(t, "days", !0);
            return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
        }
        function Kt(e, t) {
            var r = e || _t()
              , a = Ct(r, this).startOf("day")
              , i = n.calendarFormat(this, a) || "sameElse"
              , o = t && (S(t[i]) ? t[i].call(this, r) : t[i]);
            return this.format(o || this.localeData().calendar(i, this, _t(r)))
        }
        function Xt() {
            return new b(this)
        }
        function Jt(e, t) {
            var n = _(e) ? e : _t(e);
            return !(!this.isValid() || !n.isValid()) && (t = R(v(t) ? "millisecond" : t),
            "millisecond" === t ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
        }
        function Zt(e, t) {
            var n = _(e) ? e : _t(e);
            return !(!this.isValid() || !n.isValid()) && (t = R(v(t) ? "millisecond" : t),
            "millisecond" === t ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
        }
        function Qt(e, t, n, r) {
            return r = r || "()",
            ("(" === r[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === r[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
        }
        function en(e, t) {
            var n, r = _(e) ? e : _t(e);
            return !(!this.isValid() || !r.isValid()) && (t = R(t || "millisecond"),
            "millisecond" === t ? this.valueOf() === r.valueOf() : (n = r.valueOf(),
            this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
        }
        function tn(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t)
        }
        function nn(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t)
        }
        function rn(e, t, n) {
            var r, a, i, o;
            return this.isValid() ? (r = Ct(e, this),
            r.isValid() ? (a = 6e4 * (r.utcOffset() - this.utcOffset()),
            t = R(t),
            "year" === t || "month" === t || "quarter" === t ? (o = an(this, r),
            "quarter" === t ? o /= 3 : "year" === t && (o /= 12)) : (i = this - r,
            o = "second" === t ? i / 1e3 : "minute" === t ? i / 6e4 : "hour" === t ? i / 36e5 : "day" === t ? (i - a) / 864e5 : "week" === t ? (i - a) / 6048e5 : i),
            n ? o : w(o)) : NaN) : NaN
        }
        function an(e, t) {
            var n, r, a = 12 * (t.year() - e.year()) + (t.month() - e.month()), i = e.clone().add(a, "months");
            return t - i < 0 ? (n = e.clone().add(a - 1, "months"),
            r = (t - i) / (i - n)) : (n = e.clone().add(a + 1, "months"),
            r = (t - i) / (n - i)),
            -(a + r) || 0
        }
        function on() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }
        function sn() {
            var e = this.clone().utc();
            return 0 < e.year() && e.year() <= 9999 ? S(Date.prototype.toISOString) ? this.toDate().toISOString() : J(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : J(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }
        function un() {
            if (!this.isValid())
                return "moment.invalid(/* " + this._i + " */)";
            var e = "moment"
              , t = "";
            this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
            t = "Z");
            var n = "[" + e + '("]'
              , r = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
              , a = "-MM-DD[T]HH:mm:ss.SSS"
              , i = t + '[")]';
            return this.format(n + r + a + i)
        }
        function cn(e) {
            e || (e = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat);
            var t = J(this, e);
            return this.localeData().postformat(t)
        }
        function ln(e, t) {
            return this.isValid() && (_(e) && e.isValid() || _t(e).isValid()) ? Ht({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }
        function fn(e) {
            return this.from(_t(), e)
        }
        function dn(e, t) {
            return this.isValid() && (_(e) && e.isValid() || _t(e).isValid()) ? Ht({
                from: this,
                to: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }
        function hn(e) {
            return this.to(_t(), e)
        }
        function pn(e) {
            var t;
            return void 0 === e ? this._locale._abbr : (t = rt(e),
            null != t && (this._locale = t),
            this)
        }
        function mn() {
            return this._locale
        }
        function gn(e) {
            switch (e = R(e)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return "week" === e && this.weekday(0),
            "isoWeek" === e && this.isoWeekday(1),
            "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
            this
        }
        function vn(e) {
            return e = R(e),
            void 0 === e || "millisecond" === e ? this : ("date" === e && (e = "day"),
            this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
        }
        function yn() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }
        function bn() {
            return Math.floor(this.valueOf() / 1e3)
        }
        function _n() {
            return new Date(this.valueOf())
        }
        function wn() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
        }
        function An() {
            var e = this;
            return {
                years: e.year(),
                months: e.month(),
                date: e.date(),
                hours: e.hours(),
                minutes: e.minutes(),
                seconds: e.seconds(),
                milliseconds: e.milliseconds()
            }
        }
        function xn() {
            return this.isValid() ? this.toISOString() : null
        }
        function Mn() {
            return m(this)
        }
        function kn() {
            return f({}, p(this))
        }
        function Tn() {
            return p(this).overflow
        }
        function Sn() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }
        function En(e, t) {
            V(0, [e, e.length], 0, t)
        }
        function Cn(e) {
            return Pn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }
        function On(e) {
            return Pn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
        }
        function Dn() {
            return ke(this.year(), 1, 4)
        }
        function jn() {
            var e = this.localeData()._week;
            return ke(this.year(), e.dow, e.doy)
        }
        function Pn(e, t, n, r, a) {
            var i;
            return null == e ? Me(this, r, a).year : (i = ke(e, r, a),
            t > i && (t = i),
            zn.call(this, e, t, n, r, a))
        }
        function zn(e, t, n, r, a) {
            var i = xe(e, t, n, r, a)
              , o = we(i.year, 0, i.dayOfYear);
            return this.year(o.getUTCFullYear()),
            this.month(o.getUTCMonth()),
            this.date(o.getUTCDate()),
            this
        }
        function Nn(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        }
        function Wn(e) {
            var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add(e - t, "d")
        }
        function Ln(e, t) {
            t[ca] = A(1e3 * ("0." + e))
        }
        function Rn() {
            return this._isUTC ? "UTC" : ""
        }
        function qn() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }
        function Yn(e) {
            return _t(1e3 * e)
        }
        function Bn() {
            return _t.apply(null, arguments).parseZone()
        }
        function Hn(e) {
            return e
        }
        function Fn(e, t, n, r) {
            var a = rt()
              , i = d().set(r, t);
            return a[n](i, e)
        }
        function In(e, t, n) {
            if (s(e) && (t = e,
            e = void 0),
            e = e || "",
            null != t)
                return Fn(e, t, n, "month");
            var r, a = [];
            for (r = 0; r < 12; r++)
                a[r] = Fn(e, r, n, "month");
            return a
        }
        function Un(e, t, n, r) {
            "boolean" == typeof e ? (s(t) && (n = t,
            t = void 0),
            t = t || "") : (t = e,
            n = t,
            e = !1,
            s(t) && (n = t,
            t = void 0),
            t = t || "");
            var a = rt()
              , i = e ? a._week.dow : 0;
            if (null != n)
                return Fn(t, (n + i) % 7, r, "day");
            var o, u = [];
            for (o = 0; o < 7; o++)
                u[o] = Fn(t, (o + i) % 7, r, "day");
            return u
        }
        function Gn(e, t) {
            return In(e, t, "months")
        }
        function $n(e, t) {
            return In(e, t, "monthsShort")
        }
        function Vn(e, t, n) {
            return Un(e, t, n, "weekdays")
        }
        function Kn(e, t, n) {
            return Un(e, t, n, "weekdaysShort")
        }
        function Xn(e, t, n) {
            return Un(e, t, n, "weekdaysMin")
        }
        function Jn() {
            var e = this._data;
            return this._milliseconds = ei(this._milliseconds),
            this._days = ei(this._days),
            this._months = ei(this._months),
            e.milliseconds = ei(e.milliseconds),
            e.seconds = ei(e.seconds),
            e.minutes = ei(e.minutes),
            e.hours = ei(e.hours),
            e.months = ei(e.months),
            e.years = ei(e.years),
            this
        }
        function Zn(e, t, n, r) {
            var a = Ht(t, n);
            return e._milliseconds += r * a._milliseconds,
            e._days += r * a._days,
            e._months += r * a._months,
            e._bubble()
        }
        function Qn(e, t) {
            return Zn(this, e, t, 1)
        }
        function er(e, t) {
            return Zn(this, e, t, -1)
        }
        function tr(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e)
        }
        function nr() {
            var e, t, n, r, a, i = this._milliseconds, o = this._days, s = this._months, u = this._data;
            return i >= 0 && o >= 0 && s >= 0 || i <= 0 && o <= 0 && s <= 0 || (i += 864e5 * tr(ar(s) + o),
            o = 0,
            s = 0),
            u.milliseconds = i % 1e3,
            e = w(i / 1e3),
            u.seconds = e % 60,
            t = w(e / 60),
            u.minutes = t % 60,
            n = w(t / 60),
            u.hours = n % 24,
            o += w(n / 24),
            a = w(rr(o)),
            s += a,
            o -= tr(ar(a)),
            r = w(s / 12),
            s %= 12,
            u.days = o,
            u.months = s,
            u.years = r,
            this
        }
        function rr(e) {
            return 4800 * e / 146097
        }
        function ar(e) {
            return 146097 * e / 4800
        }
        function ir(e) {
            var t, n, r = this._milliseconds;
            if (e = R(e),
            "month" === e || "year" === e)
                return t = this._days + r / 864e5,
                n = this._months + rr(t),
                "month" === e ? n : n / 12;
            switch (t = this._days + Math.round(ar(this._months)),
            e) {
            case "week":
                return t / 7 + r / 6048e5;
            case "day":
                return t + r / 864e5;
            case "hour":
                return 24 * t + r / 36e5;
            case "minute":
                return 1440 * t + r / 6e4;
            case "second":
                return 86400 * t + r / 1e3;
            case "millisecond":
                return Math.floor(864e5 * t) + r;
            default:
                throw new Error("Unknown unit " + e)
            }
        }
        function or() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12)
        }
        function sr(e) {
            return function() {
                return this.as(e)
            }
        }
        function ur(e) {
            return e = R(e),
            this[e + "s"]()
        }
        function cr(e) {
            return function() {
                return this._data[e]
            }
        }
        function lr() {
            return w(this.days() / 7)
        }
        function fr(e, t, n, r, a) {
            return a.relativeTime(t || 1, !!n, e, r)
        }
        function dr(e, t, n) {
            var r = Ht(e).abs()
              , a = gi(r.as("s"))
              , i = gi(r.as("m"))
              , o = gi(r.as("h"))
              , s = gi(r.as("d"))
              , u = gi(r.as("M"))
              , c = gi(r.as("y"))
              , l = a < vi.s && ["s", a] || i <= 1 && ["m"] || i < vi.m && ["mm", i] || o <= 1 && ["h"] || o < vi.h && ["hh", o] || s <= 1 && ["d"] || s < vi.d && ["dd", s] || u <= 1 && ["M"] || u < vi.M && ["MM", u] || c <= 1 && ["y"] || ["yy", c];
            return l[2] = t,
            l[3] = +e > 0,
            l[4] = n,
            fr.apply(null, l)
        }
        function hr(e) {
            return void 0 === e ? gi : "function" == typeof e && (gi = e,
            !0)
        }
        function pr(e, t) {
            return void 0 !== vi[e] && (void 0 === t ? vi[e] : (vi[e] = t,
            !0))
        }
        function mr(e) {
            var t = this.localeData()
              , n = dr(this, !e, t);
            return e && (n = t.pastFuture(+this, n)),
            t.postformat(n)
        }
        function gr() {
            var e, t, n, r = yi(this._milliseconds) / 1e3, a = yi(this._days), i = yi(this._months);
            e = w(r / 60),
            t = w(e / 60),
            r %= 60,
            e %= 60,
            n = w(i / 12),
            i %= 12;
            var o = n
              , s = i
              , u = a
              , c = t
              , l = e
              , f = r
              , d = this.asSeconds();
            return d ? (d < 0 ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (u ? u + "D" : "") + (c || l || f ? "T" : "") + (c ? c + "H" : "") + (l ? l + "M" : "") + (f ? f + "S" : "") : "P0D"
        }
        var vr, yr;
        yr = Array.prototype.some ? Array.prototype.some : function(e) {
            for (var t = Object(this), n = t.length >>> 0, r = 0; r < n; r++)
                if (r in t && e.call(this, t[r], r, t))
                    return !0;
            return !1
        }
        ;
        var br = yr
          , _r = n.momentProperties = []
          , wr = !1
          , Ar = {};
        n.suppressDeprecationWarnings = !1,
        n.deprecationHandler = null;
        var xr;
        xr = Object.keys ? Object.keys : function(e) {
            var t, n = [];
            for (t in e)
                l(e, t) && n.push(t);
            return n
        }
        ;
        var Mr, kr = xr, Tr = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Sr = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, Er = "Invalid date", Cr = "%d", Or = /\d{1,2}/, Dr = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, jr = {}, Pr = {}, zr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Nr = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Wr = {}, Lr = {}, Rr = /\d/, qr = /\d\d/, Yr = /\d{3}/, Br = /\d{4}/, Hr = /[+-]?\d{6}/, Fr = /\d\d?/, Ir = /\d\d\d\d?/, Ur = /\d\d\d\d\d\d?/, Gr = /\d{1,3}/, $r = /\d{1,4}/, Vr = /[+-]?\d{1,6}/, Kr = /\d+/, Xr = /[+-]?\d+/, Jr = /Z|[+-]\d\d:?\d\d/gi, Zr = /Z|[+-]\d\d(?::?\d\d)?/gi, Qr = /[+-]?\d+(\.\d{1,3})?/, ea = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ta = {}, na = {}, ra = 0, aa = 1, ia = 2, oa = 3, sa = 4, ua = 5, ca = 6, la = 7, fa = 8;
        Mr = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
            var t;
            for (t = 0; t < this.length; ++t)
                if (this[t] === e)
                    return t;
            return -1
        }
        ;
        var da = Mr;
        V("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }),
        V("MMM", 0, 0, function(e) {
            return this.localeData().monthsShort(this, e)
        }),
        V("MMMM", 0, 0, function(e) {
            return this.localeData().months(this, e)
        }),
        L("month", "M"),
        Y("month", 8),
        Q("M", Fr),
        Q("MM", Fr, qr),
        Q("MMM", function(e, t) {
            return t.monthsShortRegex(e)
        }),
        Q("MMMM", function(e, t) {
            return t.monthsRegex(e)
        }),
        re(["M", "MM"], function(e, t) {
            t[aa] = A(e) - 1
        }),
        re(["MMM", "MMMM"], function(e, t, n, r) {
            var a = n._locale.monthsParse(e, r, n._strict);
            null != a ? t[aa] = a : p(n).invalidMonth = e
        });
        var ha = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
          , pa = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
          , ma = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
          , ga = ea
          , va = ea;
        V("Y", 0, 0, function() {
            var e = this.year();
            return e <= 9999 ? "" + e : "+" + e
        }),
        V(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }),
        V(0, ["YYYY", 4], 0, "year"),
        V(0, ["YYYYY", 5], 0, "year"),
        V(0, ["YYYYYY", 6, !0], 0, "year"),
        L("year", "y"),
        Y("year", 1),
        Q("Y", Xr),
        Q("YY", Fr, qr),
        Q("YYYY", $r, Br),
        Q("YYYYY", Vr, Hr),
        Q("YYYYYY", Vr, Hr),
        re(["YYYYY", "YYYYYY"], ra),
        re("YYYY", function(e, t) {
            t[ra] = 2 === e.length ? n.parseTwoDigitYear(e) : A(e)
        }),
        re("YY", function(e, t) {
            t[ra] = n.parseTwoDigitYear(e)
        }),
        re("Y", function(e, t) {
            t[ra] = parseInt(e, 10)
        }),
        n.parseTwoDigitYear = function(e) {
            return A(e) + (A(e) > 68 ? 1900 : 2e3)
        }
        ;
        var ya = H("FullYear", !0);
        V("w", ["ww", 2], "wo", "week"),
        V("W", ["WW", 2], "Wo", "isoWeek"),
        L("week", "w"),
        L("isoWeek", "W"),
        Y("week", 5),
        Y("isoWeek", 5),
        Q("w", Fr),
        Q("ww", Fr, qr),
        Q("W", Fr),
        Q("WW", Fr, qr),
        ae(["w", "ww", "W", "WW"], function(e, t, n, r) {
            t[r.substr(0, 1)] = A(e)
        });
        var ba = {
            dow: 0,
            doy: 6
        };
        V("d", 0, "do", "day"),
        V("dd", 0, 0, function(e) {
            return this.localeData().weekdaysMin(this, e)
        }),
        V("ddd", 0, 0, function(e) {
            return this.localeData().weekdaysShort(this, e)
        }),
        V("dddd", 0, 0, function(e) {
            return this.localeData().weekdays(this, e)
        }),
        V("e", 0, 0, "weekday"),
        V("E", 0, 0, "isoWeekday"),
        L("day", "d"),
        L("weekday", "e"),
        L("isoWeekday", "E"),
        Y("day", 11),
        Y("weekday", 11),
        Y("isoWeekday", 11),
        Q("d", Fr),
        Q("e", Fr),
        Q("E", Fr),
        Q("dd", function(e, t) {
            return t.weekdaysMinRegex(e)
        }),
        Q("ddd", function(e, t) {
            return t.weekdaysShortRegex(e)
        }),
        Q("dddd", function(e, t) {
            return t.weekdaysRegex(e)
        }),
        ae(["dd", "ddd", "dddd"], function(e, t, n, r) {
            var a = n._locale.weekdaysParse(e, r, n._strict);
            null != a ? t.d = a : p(n).invalidWeekday = e
        }),
        ae(["d", "e", "E"], function(e, t, n, r) {
            t[r] = A(e)
        });
        var _a = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
          , wa = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
          , Aa = "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
          , xa = ea
          , Ma = ea
          , ka = ea;
        V("H", ["HH", 2], 0, "hour"),
        V("h", ["hh", 2], 0, Ue),
        V("k", ["kk", 2], 0, Ge),
        V("hmm", 0, 0, function() {
            return "" + Ue.apply(this) + $(this.minutes(), 2)
        }),
        V("hmmss", 0, 0, function() {
            return "" + Ue.apply(this) + $(this.minutes(), 2) + $(this.seconds(), 2)
        }),
        V("Hmm", 0, 0, function() {
            return "" + this.hours() + $(this.minutes(), 2)
        }),
        V("Hmmss", 0, 0, function() {
            return "" + this.hours() + $(this.minutes(), 2) + $(this.seconds(), 2)
        }),
        $e("a", !0),
        $e("A", !1),
        L("hour", "h"),
        Y("hour", 13),
        Q("a", Ve),
        Q("A", Ve),
        Q("H", Fr),
        Q("h", Fr),
        Q("HH", Fr, qr),
        Q("hh", Fr, qr),
        Q("hmm", Ir),
        Q("hmmss", Ur),
        Q("Hmm", Ir),
        Q("Hmmss", Ur),
        re(["H", "HH"], oa),
        re(["a", "A"], function(e, t, n) {
            n._isPm = n._locale.isPM(e),
            n._meridiem = e
        }),
        re(["h", "hh"], function(e, t, n) {
            t[oa] = A(e),
            p(n).bigHour = !0
        }),
        re("hmm", function(e, t, n) {
            var r = e.length - 2;
            t[oa] = A(e.substr(0, r)),
            t[sa] = A(e.substr(r)),
            p(n).bigHour = !0
        }),
        re("hmmss", function(e, t, n) {
            var r = e.length - 4
              , a = e.length - 2;
            t[oa] = A(e.substr(0, r)),
            t[sa] = A(e.substr(r, 2)),
            t[ua] = A(e.substr(a)),
            p(n).bigHour = !0
        }),
        re("Hmm", function(e, t, n) {
            var r = e.length - 2;
            t[oa] = A(e.substr(0, r)),
            t[sa] = A(e.substr(r))
        }),
        re("Hmmss", function(e, t, n) {
            var r = e.length - 4
              , a = e.length - 2;
            t[oa] = A(e.substr(0, r)),
            t[sa] = A(e.substr(r, 2)),
            t[ua] = A(e.substr(a))
        });
        var Ta, Sa = /[ap]\.?m?\.?/i, Ea = H("Hours", !0), Ca = {
            calendar: Tr,
            longDateFormat: Sr,
            invalidDate: Er,
            ordinal: Cr,
            ordinalParse: Or,
            relativeTime: Dr,
            months: pa,
            monthsShort: ma,
            week: ba,
            weekdays: _a,
            weekdaysMin: Aa,
            weekdaysShort: wa,
            meridiemParse: Sa
        }, Oa = {}, Da = {}, ja = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Pa = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, za = /Z|[+-]\d\d(?::?\d\d)?/, Na = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Wa = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], La = /^\/?Date\((\-?\d+)/i;
        n.createFromInputFallback = k("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
            e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
        }),
        n.ISO_8601 = function() {}
        ;
        var Ra = k("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = _t.apply(null, arguments);
            return this.isValid() && e.isValid() ? e < this ? this : e : g()
        })
          , qa = k("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = _t.apply(null, arguments);
            return this.isValid() && e.isValid() ? e > this ? this : e : g()
        })
          , Ya = function() {
            return Date.now ? Date.now() : +new Date
        };
        St("Z", ":"),
        St("ZZ", ""),
        Q("Z", Zr),
        Q("ZZ", Zr),
        re(["Z", "ZZ"], function(e, t, n) {
            n._useUTC = !0,
            n._tzm = Et(Zr, e)
        });
        var Ba = /([\+\-]|\d\d)/gi;
        n.updateOffset = function() {}
        ;
        var Ha = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
          , Fa = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        Ht.fn = Mt.prototype;
        var Ia = Gt(1, "add")
          , Ua = Gt(-1, "subtract");
        n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
        n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Ga = k("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
            return void 0 === e ? this.localeData() : this.locale(e)
        });
        V(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }),
        V(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }),
        En("gggg", "weekYear"),
        En("ggggg", "weekYear"),
        En("GGGG", "isoWeekYear"),
        En("GGGGG", "isoWeekYear"),
        L("weekYear", "gg"),
        L("isoWeekYear", "GG"),
        Y("weekYear", 1),
        Y("isoWeekYear", 1),
        Q("G", Xr),
        Q("g", Xr),
        Q("GG", Fr, qr),
        Q("gg", Fr, qr),
        Q("GGGG", $r, Br),
        Q("gggg", $r, Br),
        Q("GGGGG", Vr, Hr),
        Q("ggggg", Vr, Hr),
        ae(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, r) {
            t[r.substr(0, 2)] = A(e)
        }),
        ae(["gg", "GG"], function(e, t, r, a) {
            t[a] = n.parseTwoDigitYear(e)
        }),
        V("Q", 0, "Qo", "quarter"),
        L("quarter", "Q"),
        Y("quarter", 7),
        Q("Q", Rr),
        re("Q", function(e, t) {
            t[aa] = 3 * (A(e) - 1)
        }),
        V("D", ["DD", 2], "Do", "date"),
        L("date", "D"),
        Y("date", 9),
        Q("D", Fr),
        Q("DD", Fr, qr),
        Q("Do", function(e, t) {
            return e ? t._ordinalParse : t._ordinalParseLenient
        }),
        re(["D", "DD"], ia),
        re("Do", function(e, t) {
            t[ia] = A(e.match(Fr)[0], 10)
        });
        var $a = H("Date", !0);
        V("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
        L("dayOfYear", "DDD"),
        Y("dayOfYear", 4),
        Q("DDD", Gr),
        Q("DDDD", Yr),
        re(["DDD", "DDDD"], function(e, t, n) {
            n._dayOfYear = A(e)
        }),
        V("m", ["mm", 2], 0, "minute"),
        L("minute", "m"),
        Y("minute", 14),
        Q("m", Fr),
        Q("mm", Fr, qr),
        re(["m", "mm"], sa);
        var Va = H("Minutes", !1);
        V("s", ["ss", 2], 0, "second"),
        L("second", "s"),
        Y("second", 15),
        Q("s", Fr),
        Q("ss", Fr, qr),
        re(["s", "ss"], ua);
        var Ka = H("Seconds", !1);
        V("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }),
        V(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }),
        V(0, ["SSS", 3], 0, "millisecond"),
        V(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }),
        V(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }),
        V(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }),
        V(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }),
        V(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }),
        V(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }),
        L("millisecond", "ms"),
        Y("millisecond", 16),
        Q("S", Gr, Rr),
        Q("SS", Gr, qr),
        Q("SSS", Gr, Yr);
        var Xa;
        for (Xa = "SSSS"; Xa.length <= 9; Xa += "S")
            Q(Xa, Kr);
        for (Xa = "S"; Xa.length <= 9; Xa += "S")
            re(Xa, Ln);
        var Ja = H("Milliseconds", !1);
        V("z", 0, 0, "zoneAbbr"),
        V("zz", 0, 0, "zoneName");
        var Za = b.prototype;
        Za.add = Ia,
        Za.calendar = Kt,
        Za.clone = Xt,
        Za.diff = rn,
        Za.endOf = vn,
        Za.format = cn,
        Za.from = ln,
        Za.fromNow = fn,
        Za.to = dn,
        Za.toNow = hn,
        Za.get = U,
        Za.invalidAt = Tn,
        Za.isAfter = Jt,
        Za.isBefore = Zt,
        Za.isBetween = Qt,
        Za.isSame = en,
        Za.isSameOrAfter = tn,
        Za.isSameOrBefore = nn,
        Za.isValid = Mn,
        Za.lang = Ga,
        Za.locale = pn,
        Za.localeData = mn,
        Za.max = qa,
        Za.min = Ra,
        Za.parsingFlags = kn,
        Za.set = G,
        Za.startOf = gn,
        Za.subtract = Ua,
        Za.toArray = wn,
        Za.toObject = An,
        Za.toDate = _n,
        Za.toISOString = sn,
        Za.inspect = un,
        Za.toJSON = xn,
        Za.toString = on,
        Za.unix = bn,
        Za.valueOf = yn,
        Za.creationData = Sn,
        Za.year = ya,
        Za.isLeapYear = be,
        Za.weekYear = Cn,
        Za.isoWeekYear = On,
        Za.quarter = Za.quarters = Nn,
        Za.month = de,
        Za.daysInMonth = he,
        Za.week = Za.weeks = Ce,
        Za.isoWeek = Za.isoWeeks = Oe,
        Za.weeksInYear = jn,
        Za.isoWeeksInYear = Dn,
        Za.date = $a,
        Za.day = Za.days = Re,
        Za.weekday = qe,
        Za.isoWeekday = Ye,
        Za.dayOfYear = Wn,
        Za.hour = Za.hours = Ea,
        Za.minute = Za.minutes = Va,
        Za.second = Za.seconds = Ka,
        Za.millisecond = Za.milliseconds = Ja,
        Za.utcOffset = Dt,
        Za.utc = Pt,
        Za.local = zt,
        Za.parseZone = Nt,
        Za.hasAlignedHourOffset = Wt,
        Za.isDST = Lt,
        Za.isLocal = qt,
        Za.isUtcOffset = Yt,
        Za.isUtc = Bt,
        Za.isUTC = Bt,
        Za.zoneAbbr = Rn,
        Za.zoneName = qn,
        Za.dates = k("dates accessor is deprecated. Use date instead.", $a),
        Za.months = k("months accessor is deprecated. Use month instead", de),
        Za.years = k("years accessor is deprecated. Use year instead", ya),
        Za.zone = k("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", jt),
        Za.isDSTShifted = k("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Rt);
        var Qa = O.prototype;
        Qa.calendar = D,
        Qa.longDateFormat = j,
        Qa.invalidDate = P,
        Qa.ordinal = z,
        Qa.preparse = Hn,
        Qa.postformat = Hn,
        Qa.relativeTime = N,
        Qa.pastFuture = W,
        Qa.set = E,
        Qa.months = se,
        Qa.monthsShort = ue,
        Qa.monthsParse = le,
        Qa.monthsRegex = me,
        Qa.monthsShortRegex = pe,
        Qa.week = Te,
        Qa.firstDayOfYear = Ee,
        Qa.firstDayOfWeek = Se,
        Qa.weekdays = Pe,
        Qa.weekdaysMin = Ne,
        Qa.weekdaysShort = ze,
        Qa.weekdaysParse = Le,
        Qa.weekdaysRegex = Be,
        Qa.weekdaysShortRegex = He,
        Qa.weekdaysMinRegex = Fe,
        Qa.isPM = Ke,
        Qa.meridiem = Xe,
        et("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(e) {
                var t = e % 10
                  , n = 1 === A(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            }
        }),
        n.lang = k("moment.lang is deprecated. Use moment.locale instead.", et),
        n.langData = k("moment.langData is deprecated. Use moment.localeData instead.", rt);
        var ei = Math.abs
          , ti = sr("ms")
          , ni = sr("s")
          , ri = sr("m")
          , ai = sr("h")
          , ii = sr("d")
          , oi = sr("w")
          , si = sr("M")
          , ui = sr("y")
          , ci = cr("milliseconds")
          , li = cr("seconds")
          , fi = cr("minutes")
          , di = cr("hours")
          , hi = cr("days")
          , pi = cr("months")
          , mi = cr("years")
          , gi = Math.round
          , vi = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }
          , yi = Math.abs
          , bi = Mt.prototype;
        return bi.abs = Jn,
        bi.add = Qn,
        bi.subtract = er,
        bi.as = ir,
        bi.asMilliseconds = ti,
        bi.asSeconds = ni,
        bi.asMinutes = ri,
        bi.asHours = ai,
        bi.asDays = ii,
        bi.asWeeks = oi,
        bi.asMonths = si,
        bi.asYears = ui,
        bi.valueOf = or,
        bi._bubble = nr,
        bi.get = ur,
        bi.milliseconds = ci,
        bi.seconds = li,
        bi.minutes = fi,
        bi.hours = di,
        bi.days = hi,
        bi.weeks = lr,
        bi.months = pi,
        bi.years = mi,
        bi.humanize = mr,
        bi.toISOString = gr,
        bi.toString = gr,
        bi.toJSON = gr,
        bi.locale = pn,
        bi.localeData = mn,
        bi.toIsoString = k("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", gr),
        bi.lang = Ga,
        V("X", 0, 0, "unix"),
        V("x", 0, 0, "valueOf"),
        Q("x", Xr),
        Q("X", Qr),
        re("X", function(e, t, n) {
            n._d = new Date(1e3 * parseFloat(e, 10))
        }),
        re("x", function(e, t, n) {
            n._d = new Date(A(e))
        }),
        n.version = "2.16.0",
        r(_t),
        n.fn = Za,
        n.min = At,
        n.max = xt,
        n.now = Ya,
        n.utc = d,
        n.unix = Yn,
        n.months = Gn,
        n.isDate = u,
        n.locale = et,
        n.invalid = g,
        n.duration = Ht,
        n.isMoment = _,
        n.weekdays = Vn,
        n.parseZone = Bn,
        n.localeData = rt,
        n.isDuration = kt,
        n.monthsShort = $n,
        n.weekdaysMin = Xn,
        n.defineLocale = tt,
        n.updateLocale = nt,
        n.locales = at,
        n.weekdaysShort = Kn,
        n.normalizeUnits = R,
        n.relativeTimeRounding = hr,
        n.relativeTimeThreshold = pr,
        n.calendarFormat = Vt,
        n.prototype = Za,
        n
    })
})
  , lp = n(function(e) {
    !function(t, n) {
        "function" == typeof define && define.amd ? define(["moment"], n) : "object" == typeof e && e.exports ? e.exports = n(cp) : n(t.moment)
    }(this, function(e) {
        function t(e) {
            return e > 96 ? e - 87 : e > 64 ? e - 29 : e - 48
        }
        function n(e) {
            var n, r = 0, a = e.split("."), i = a[0], o = a[1] || "", s = 1, u = 0, c = 1;
            for (45 === e.charCodeAt(0) && (r = 1,
            c = -1),
            r; r < i.length; r++)
                n = t(i.charCodeAt(r)),
                u = 60 * u + n;
            for (r = 0; r < o.length; r++)
                s /= 60,
                n = t(o.charCodeAt(r)),
                u += n * s;
            return u * c
        }
        function r(e) {
            for (var t = 0; t < e.length; t++)
                e[t] = n(e[t])
        }
        function a(e, t) {
            for (var n = 0; n < t; n++)
                e[n] = Math.round((e[n - 1] || 0) + 6e4 * e[n]);
            e[t - 1] = 1 / 0
        }
        function i(e, t) {
            var n, r = [];
            for (n = 0; n < t.length; n++)
                r[n] = e[t[n]];
            return r
        }
        function o(e) {
            var t = e.split("|")
              , n = t[2].split(" ")
              , o = t[3].split("")
              , s = t[4].split(" ");
            return r(n),
            r(o),
            r(s),
            a(s, o.length),
            {
                name: t[0],
                abbrs: i(t[1].split(" "), o),
                offsets: i(n, o),
                untils: s,
                population: 0 | t[5]
            }
        }
        function s(e) {
            e && this._set(o(e))
        }
        function u(e) {
            var t = e.toTimeString()
              , n = t.match(/\([a-z ]+\)/i);
            n && n[0] ? (n = n[0].match(/[A-Z]/g),
            n = n ? n.join("") : void 0) : (n = t.match(/[A-Z]{3,5}/g),
            n = n ? n[0] : void 0),
            "GMT" === n && (n = void 0),
            this.at = +e,
            this.abbr = n,
            this.offset = e.getTimezoneOffset()
        }
        function c(e) {
            this.zone = e,
            this.offsetScore = 0,
            this.abbrScore = 0
        }
        function l(e, t) {
            for (var n, r; r = 6e4 * ((t.at - e.at) / 12e4 | 0); )
                n = new u(new Date(e.at + r)),
                n.offset === e.offset ? e = n : t = n;
            return e
        }
        function f() {
            var e, t, n, r = (new Date).getFullYear() - 2, a = new u(new Date(r,0,1)), i = [a];
            for (n = 1; n < 48; n++)
                t = new u(new Date(r,n,1)),
                t.offset !== a.offset && (e = l(a, t),
                i.push(e),
                i.push(new u(new Date(e.at + 6e4)))),
                a = t;
            for (n = 0; n < 4; n++)
                i.push(new u(new Date(r + n,0,1))),
                i.push(new u(new Date(r + n,6,1)));
            return i
        }
        function d(e, t) {
            return e.offsetScore !== t.offsetScore ? e.offsetScore - t.offsetScore : e.abbrScore !== t.abbrScore ? e.abbrScore - t.abbrScore : t.zone.population - e.zone.population
        }
        function h(e, t) {
            var n, a;
            for (r(t),
            n = 0; n < t.length; n++)
                a = t[n],
                z[a] = z[a] || {},
                z[a][e] = !0
        }
        function p(e) {
            var t, n, r, a = e.length, i = {}, o = [];
            for (t = 0; t < a; t++) {
                r = z[e[t].offset] || {};
                for (n in r)
                    r.hasOwnProperty(n) && (i[n] = !0)
            }
            for (t in i)
                i.hasOwnProperty(t) && o.push(P[t]);
            return o
        }
        function m() {
            try {
                var e = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (e) {
                    var t = P[v(e)];
                    if (t)
                        return t;
                    k("Moment Timezone found " + e + " from the Intl api, but did not have that data loaded.")
                }
            } catch (e) {}
            var n, r, a, i = f(), o = i.length, s = p(i), u = [];
            for (r = 0; r < s.length; r++) {
                for (n = new c(b(s[r]),o),
                a = 0; a < o; a++)
                    n.scoreOffsetAt(i[a]);
                u.push(n)
            }
            return u.sort(d),
            u.length > 0 ? u[0].zone.name : void 0
        }
        function g(e) {
            return C && !e || (C = m()),
            C
        }
        function v(e) {
            return (e || "").toLowerCase().replace(/\//g, "_")
        }
        function y(e) {
            var t, n, r, a;
            for ("string" == typeof e && (e = [e]),
            t = 0; t < e.length; t++)
                r = e[t].split("|"),
                n = r[0],
                a = v(n),
                D[a] = e[t],
                P[a] = n,
                r[5] && h(a, r[2].split(" "))
        }
        function b(e, t) {
            e = v(e);
            var n, r = D[e];
            return r instanceof s ? r : "string" == typeof r ? (r = new s(r),
            D[e] = r,
            r) : j[e] && t !== b && (n = b(j[e], b)) ? (r = D[e] = new s,
            r._set(n),
            r.name = P[e],
            r) : null
        }
        function _() {
            var e, t = [];
            for (e in P)
                P.hasOwnProperty(e) && (D[e] || D[j[e]]) && P[e] && t.push(P[e]);
            return t.sort()
        }
        function w(e) {
            var t, n, r, a;
            for ("string" == typeof e && (e = [e]),
            t = 0; t < e.length; t++)
                n = e[t].split("|"),
                r = v(n[0]),
                a = v(n[1]),
                j[r] = a,
                P[r] = n[0],
                j[a] = r,
                P[a] = n[1]
        }
        function A(e) {
            y(e.zones),
            w(e.links),
            T.dataVersion = e.version
        }
        function x(e) {
            return x.didShowError || (x.didShowError = !0,
            k("moment.tz.zoneExists('" + e + "') has been deprecated in favor of !moment.tz.zone('" + e + "')")),
            !!b(e)
        }
        function M(e) {
            return !(!e._a || void 0 !== e._tzm)
        }
        function k(e) {
            "undefined" != typeof console && "function" == typeof console.error && console.error(e)
        }
        function T(t) {
            var n = Array.prototype.slice.call(arguments, 0, -1)
              , r = arguments[arguments.length - 1]
              , a = b(r)
              , i = e.utc.apply(null, n);
            return a && !e.isMoment(t) && M(i) && i.add(a.parse(i), "minutes"),
            i.tz(r),
            i
        }
        function S(e) {
            return function() {
                return this._z ? this._z.abbr(this) : e.call(this)
            }
        }
        function E(e) {
            return function() {
                return this._z = null,
                e.apply(this, arguments)
            }
        }
        if (void 0 !== e.tz)
            return k("Moment Timezone " + e.tz.version + " was already loaded " + (e.tz.dataVersion ? "with data from " : "without any data") + e.tz.dataVersion),
            e;
        var C, O = "0.5.10", D = {}, j = {}, P = {}, z = {}, N = e.version.split("."), W = +N[0], L = +N[1];
        (W < 2 || 2 === W && L < 6) && k("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + e.version + ". See momentjs.com"),
        s.prototype = {
            _set: function(e) {
                this.name = e.name,
                this.abbrs = e.abbrs,
                this.untils = e.untils,
                this.offsets = e.offsets,
                this.population = e.population
            },
            _index: function(e) {
                var t, n = +e, r = this.untils;
                for (t = 0; t < r.length; t++)
                    if (n < r[t])
                        return t
            },
            parse: function(e) {
                var t, n, r, a, i = +e, o = this.offsets, s = this.untils, u = s.length - 1;
                for (a = 0; a < u; a++)
                    if (t = o[a],
                    n = o[a + 1],
                    r = o[a ? a - 1 : a],
                    t < n && T.moveAmbiguousForward ? t = n : t > r && T.moveInvalidForward && (t = r),
                    i < s[a] - 6e4 * t)
                        return o[a];
                return o[u]
            },
            abbr: function(e) {
                return this.abbrs[this._index(e)]
            },
            offset: function(e) {
                return this.offsets[this._index(e)]
            }
        },
        c.prototype.scoreOffsetAt = function(e) {
            this.offsetScore += Math.abs(this.zone.offset(e.at) - e.offset),
            this.zone.abbr(e.at).replace(/[^A-Z]/g, "") !== e.abbr && this.abbrScore++
        }
        ,
        T.version = O,
        T.dataVersion = "",
        T._zones = D,
        T._links = j,
        T._names = P,
        T.add = y,
        T.link = w,
        T.load = A,
        T.zone = b,
        T.zoneExists = x,
        T.guess = g,
        T.names = _,
        T.Zone = s,
        T.unpack = o,
        T.unpackBase60 = n,
        T.needsOffset = M,
        T.moveInvalidForward = !0,
        T.moveAmbiguousForward = !1;
        var R = e.fn;
        e.tz = T,
        e.defaultZone = null,
        e.updateOffset = function(t, n) {
            var r, a = e.defaultZone;
            void 0 === t._z && (a && M(t) && !t._isUTC && (t._d = e.utc(t._a)._d,
            t.utc().add(a.parse(t), "minutes")),
            t._z = a),
            t._z && (r = t._z.offset(t),
            Math.abs(r) < 16 && (r /= 60),
            void 0 !== t.utcOffset ? t.utcOffset(-r, n) : t.zone(r, n))
        }
        ,
        R.tz = function(t) {
            return t ? (this._z = b(t),
            this._z ? e.updateOffset(this) : k("Moment Timezone has no data for " + t + ". See http://momentjs.com/timezone/docs/#/data-loading/."),
            this) : this._z ? this._z.name : void 0
        }
        ,
        R.zoneName = S(R.zoneName),
        R.zoneAbbr = S(R.zoneAbbr),
        R.utc = E(R.utc),
        e.tz.setDefault = function(t) {
            return (W < 2 || 2 === W && L < 9) && k("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + e.version + "."),
            e.defaultZone = t ? b(t) : null,
            e
        }
        ;
        var q = e.momentProperties;
        return "[object Array]" === Object.prototype.toString.call(q) ? (q.push("_z"),
        q.push("_a")) : q && (q._z = null),
        A({
            version: "2016j",
            zones: ["Africa/Abidjan|GMT|0|0||48e5", "Africa/Khartoum|EAT|-30|0||51e5", "Africa/Algiers|CET|-10|0||26e5", "Africa/Lagos|WAT|-10|0||17e6", "Africa/Maputo|CAT|-20|0||26e5", "Africa/Cairo|EET EEST|-20 -30|010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", "Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0|32e5", "Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6", "Africa/Johannesburg|SAST|-20|0||84e5", "Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00|11e5", "Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0|32e4", "America/Adak|HST HDT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Santo_Domingo|AST|40|0||29e5", "America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0|14e4", "America/Argentina/Buenos_Aires|ART|30|0|", "America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5", "America/Panama|EST|50|0||15e5", "America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0|27e5", "America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3", "America/Fortaleza|BRT|30|0||34e5", "America/Managua|CST|60|0||22e5", "America/Manaus|AMT|40|0||19e5", "America/Bogota|COT|50|0||90e5", "America/Denver|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|77e4", "America/Cancun|CST CDT EST|60 50 50|010101010102|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|VET VET|4u 40|01|1QMT0|29e5", "America/Cayenne|GFT|30|0||58e3", "America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4", "America/Phoenix|MST|70|0||42e5", "America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/New_York|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Rio_Branco|AMT ACT|40 50|01|1KLE0|31e4", "America/Fort_Nelson|PST PDT MST|80 70 70|010101010102|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", "America/Halifax|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3", "America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", "America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Guayaquil|ECT|50|0||27e5", "America/Guyana|GYT|40|0||80e4", "America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/La_Paz|BOT|40|0||19e5", "America/Lima|PET|50|0||11e6", "America/Mexico_City|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6", "America/Metlakatla|PST AKST AKDT|80 90 80|012121212121|1PAa0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Montevideo|UYST UYT|20 30|010101010101|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", "America/Noronha|FNT|20|0||30e2", "America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Paramaribo|SRT|30|0||24e4", "America/Port-au-Prince|EST EDT|50 40|010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Santiago|CLST CLT|30 40|010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|62e5", "America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|20e6", "America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452", "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "Antarctica/Casey|+11 +08|-b0 -80|01010|1BN30 40P0 KL0 blz0|10", "Antarctica/Davis|+05 +07|-50 -70|0101|1BPw0 3Wn0 KN0|70", "Antarctica/DumontDUrville|+10|-a0|0||80", "Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140|1", "Asia/Tashkent|+05|-50|0||23e5", "Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5", "Antarctica/Rothera|-03|30|0||130", "Antarctica/Syowa|+03|-30|0||20", "Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40", "Asia/Almaty|+06|-60|0||15e5", "Asia/Baghdad|AST|-30|0||66e5", "Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|25e5", "Asia/Kamchatka|+12 +11|-c0 -b0|010|1Dp30 WM0|18e4", "Asia/Baku|+04 +05|-40 -50|0101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5", "Asia/Bangkok|ICT|-70|0||15e6", "Asia/Barnaul|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 3rd0", "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5", "Asia/Brunei|BNT|-80|0||42e4", "Asia/Kolkata|IST|-5u|0||15e6", "Asia/Chita|+09 +10 +08|-90 -a0 -80|010120|1BWh0 1qM0 WM0 8Hz0 3re0|33e4", "Asia/Choibalsan|CHOT CHOST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST|-80|0||23e6", "Asia/Colombo|+0530|-5u|0||22e5", "Asia/Dhaka|BDT|-60|0||16e6", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0|26e5", "Asia/Dili|TLT|-90|0||19e4", "Asia/Dubai|GST|-40|0||39e5", "Asia/Famagusta|EET EEST +03|-20 -30 -30|010101010101012|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0", "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|18e5", "Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|25e4", "Asia/Hong_Kong|HKT|-80|0||73e5", "Asia/Hovd|HOVT HOVST|-70 -80|0101010101010|1O8H0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|+08 +09|-80 -90|01010|1BWi0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|EET EEST +03|-20 -30 -30|010101010101012|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6", "Asia/Jakarta|WIB|-70|0||31e6", "Asia/Jayapura|WIT|-90|0||26e4", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4", "Asia/Kabul|AFT|-4u|0||46e5", "Asia/Karachi|PKT|-50|0||24e6", "Asia/Urumqi|XJT|-60|0||32e5", "Asia/Kathmandu|NPT|-5J|0||12e5", "Asia/Khandyga|+10 +11 +09|-a0 -b0 -90|010102|1BWg0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|+07 +08|-70 -80|01010|1BWj0 1qM0 WM0 8Hz0|10e5", "Asia/Kuala_Lumpur|MYT|-80|0||71e5", "Asia/Magadan|+11 +12 +10|-b0 -c0 -a0|010120|1BWf0 1qM0 WM0 8Hz0 3Cq0|95e3", "Asia/Makassar|WITA|-80|0||15e5", "Asia/Manila|PHT|-80|0||24e6", "Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5", "Asia/Novokuznetsk|+07 +06|-70 -60|010|1Dp80 WM0|55e4", "Asia/Novosibirsk|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 4eN0|15e5", "Asia/Omsk|+06 +07|-60 -70|01010|1BWk0 1qM0 WM0 8Hz0|12e5", "Asia/Pyongyang|KST KST|-90 -8u|01|1P4D0|29e5", "Asia/Rangoon|MMT|-6u|0||48e5", "Asia/Sakhalin|+10 +11|-a0 -b0|010101|1BWg0 1qM0 WM0 8Hz0 3rd0|58e4", "Asia/Seoul|KST|-90|0||23e6", "Asia/Singapore|SGT|-80|0||56e5", "Asia/Srednekolymsk|+11 +12|-b0 -c0|01010|1BWf0 1qM0 WM0 8Hz0|35e2", "Asia/Tbilisi|+04|-40|0||11e5", "Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Thimphu|BTT|-60|0||79e3", "Asia/Tokyo|JST|-90|0||38e6", "Asia/Tomsk|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 3Qp0|10e5", "Asia/Ulaanbaatar|ULAT ULAST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|12e5", "Asia/Ust-Nera|+11 +12 +10|-b0 -c0 -a0|010102|1BWf0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|+10 +11|-a0 -b0|01010|1BWg0 1qM0 WM0 8Hz0|60e4", "Asia/Yakutsk|+09 +10|-90 -a0|01010|1BWh0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|+05 +06|-50 -60|01010|1BWl0 1qM0 WM0 8Hz0|14e5", "Asia/Yerevan|+04 +05|-40 -50|01010|1BWm0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4", "Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Atlantic/Cape_Verde|CVT|10|0||50e4", "Atlantic/South_Georgia|GST|20|0||30", "Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10|21e2", "Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5", "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5", "Australia/Brisbane|AEST|-a0|0||20e5", "Australia/Darwin|ACST|-9u|0||12e4", "Australia/Eucla|ACWST|-8J|0||368", "Australia/Lord_Howe|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347", "Australia/Perth|AWST|-80|0||18e5", "Pacific/Easter|EASST EAST|50 60|010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|30e2", "Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Etc/GMT+1|-01|10|0|", "Etc/GMT+10|-10|a0|0|", "Etc/GMT+11|-11|b0|0|", "Etc/GMT+12|-12|c0|0|", "Etc/GMT+2|-02|20|0|", "Etc/GMT+4|-04|40|0|", "Etc/GMT+5|-05|50|0|", "Etc/GMT+6|-06|60|0|", "Etc/GMT+7|-07|70|0|", "Etc/GMT+8|-08|80|0|", "Etc/GMT+9|-09|90|0|", "Etc/GMT-1|+01|-10|0|", "Etc/GMT-11|+11|-b0|0|", "Etc/GMT-12|+12|-c0|0|", "Etc/GMT-13|+13|-d0|0|", "Etc/GMT-14|+14|-e0|0|", "Etc/GMT-2|+02|-20|0|", "Etc/GMT-7|+07|-70|0|", "Etc/GMT-8|+08|-80|0|", "Etc/GMT-9|+09|-90|0|", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/Astrakhan|+03 +04|-30 -40|010101|1BWn0 1qM0 WM0 8Hz0 3rd0", "Europe/London|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6", "Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4", "Europe/Kaliningrad|EET EEST +03|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0|44e4", "Europe/Volgograd|+03 +04|-30 -40|01010|1BWn0 1qM0 WM0 8Hz0|10e5", "Europe/Minsk|EET EEST +03|-20 -30 -30|0102|1BWo0 1qM0 WM0|19e5", "Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6", "Europe/Samara|+04 +03|-40 -30|010|1Dpb0 WM0|12e5", "Europe/Saratov|+03 +04|-30 -40|010101|1BWn0 1qM0 WM0 8Hz0 5810", "Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Pacific/Honolulu|HST|a0|0||37e4", "Indian/Chagos|IOT|-60|0||30e2", "Indian/Christmas|CXT|-70|0||21e2", "Indian/Cocos|CCT|-6u|0||596", "Indian/Mahe|SCT|-40|0||79e3", "Indian/Maldives|MVT|-50|0||35e4", "Indian/Mauritius|MUT|-40|0||15e4", "Indian/Reunion|RET|-40|0||84e4", "Pacific/Majuro|MHT|-c0|0||28e3", "MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Pacific/Chatham|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600", "Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3", "Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0|18e4", "Pacific/Chuuk|CHUT|-a0|0||49e3", "Pacific/Efate|VUT|-b0|0||66e3", "Pacific/Enderbury|PHOT|-d0|0||1", "Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0|88e4", "Pacific/Funafuti|TVT|-c0|0||45e2", "Pacific/Galapagos|GALT|60|0||25e3", "Pacific/Gambier|GAMT|90|0||125", "Pacific/Guadalcanal|SBT|-b0|0||11e4", "Pacific/Guam|ChST|-a0|0||17e4", "Pacific/Kiritimati|LINT|-e0|0||51e2", "Pacific/Kosrae|KOST|-b0|0||66e2", "Pacific/Marquesas|MART|9u|0||86e2", "Pacific/Pago_Pago|SST|b0|0||37e2", "Pacific/Nauru|NRT|-c0|0||10e3", "Pacific/Niue|NUT|b0|0||12e2", "Pacific/Norfolk|NFT NFT|-bu -b0|01|1PoCu|25e4", "Pacific/Noumea|NCT|-b0|0||98e3", "Pacific/Palau|PWT|-90|0||21e3", "Pacific/Pitcairn|PST|80|0||56", "Pacific/Pohnpei|PONT|-b0|0||34e3", "Pacific/Port_Moresby|PGT|-a0|0||25e4", "Pacific/Rarotonga|CKT|a0|0||13e3", "Pacific/Tahiti|TAHT|a0|0||18e4", "Pacific/Tarawa|GILT|-c0|0||29e3", "Pacific/Tongatapu|+13 +14|-d0 -e0|0101010101|1S4d0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0|75e3", "Pacific/Wake|WAKT|-c0|0||16e3", "Pacific/Wallis|WFT|-c0|0||94"],
            links: ["Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Bissau", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Monrovia", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|America/Danmarkshavn", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Algiers|Africa/Tunis", "Africa/Cairo|Egypt", "Africa/Casablanca|Africa/El_Aaiun", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Khartoum|Africa/Addis_Ababa", "Africa/Khartoum|Africa/Asmara", "Africa/Khartoum|Africa/Asmera", "Africa/Khartoum|Africa/Dar_es_Salaam", "Africa/Khartoum|Africa/Djibouti", "Africa/Khartoum|Africa/Juba", "Africa/Khartoum|Africa/Kampala", "Africa/Khartoum|Africa/Mogadishu", "Africa/Khartoum|Africa/Nairobi", "Africa/Khartoum|Indian/Antananarivo", "Africa/Khartoum|Indian/Comoro", "Africa/Khartoum|Indian/Mayotte", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Ndjamena", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|America/Juneau", "America/Anchorage|America/Nome", "America/Anchorage|America/Sitka", "America/Anchorage|America/Yakutat", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Argentina/Catamarca", "America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia", "America/Argentina/Buenos_Aires|America/Argentina/Cordoba", "America/Argentina/Buenos_Aires|America/Argentina/Jujuy", "America/Argentina/Buenos_Aires|America/Argentina/La_Rioja", "America/Argentina/Buenos_Aires|America/Argentina/Mendoza", "America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos", "America/Argentina/Buenos_Aires|America/Argentina/Salta", "America/Argentina/Buenos_Aires|America/Argentina/San_Juan", "America/Argentina/Buenos_Aires|America/Argentina/San_Luis", "America/Argentina/Buenos_Aires|America/Argentina/Tucuman", "America/Argentina/Buenos_Aires|America/Argentina/Ushuaia", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Buenos_Aires|America/Catamarca", "America/Argentina/Buenos_Aires|America/Cordoba", "America/Argentina/Buenos_Aires|America/Jujuy", "America/Argentina/Buenos_Aires|America/Mendoza", "America/Argentina/Buenos_Aires|America/Rosario", "America/Campo_Grande|America/Cuiaba", "America/Chicago|America/Indiana/Knox", "America/Chicago|America/Indiana/Tell_City", "America/Chicago|America/Knox_IN", "America/Chicago|America/Matamoros", "America/Chicago|America/Menominee", "America/Chicago|America/North_Dakota/Center", "America/Chicago|America/North_Dakota/New_Salem", "America/Chicago|America/Rainy_River", "America/Chicago|America/Rankin_Inlet", "America/Chicago|America/Resolute", "America/Chicago|America/Winnipeg", "America/Chicago|CST6CDT", "America/Chicago|Canada/Central", "America/Chicago|US/Central", "America/Chicago|US/Indiana-Starke", "America/Chihuahua|America/Mazatlan", "America/Chihuahua|Mexico/BajaSur", "America/Denver|America/Boise", "America/Denver|America/Cambridge_Bay", "America/Denver|America/Edmonton", "America/Denver|America/Inuvik", "America/Denver|America/Ojinaga", "America/Denver|America/Shiprock", "America/Denver|America/Yellowknife", "America/Denver|Canada/Mountain", "America/Denver|MST7MDT", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Fortaleza|America/Belem", "America/Fortaleza|America/Maceio", "America/Fortaleza|America/Recife", "America/Fortaleza|America/Santarem", "America/Halifax|America/Glace_Bay", "America/Halifax|America/Moncton", "America/Halifax|America/Thule", "America/Halifax|Atlantic/Bermuda", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/Los_Angeles|America/Dawson", "America/Los_Angeles|America/Ensenada", "America/Los_Angeles|America/Santa_Isabel", "America/Los_Angeles|America/Tijuana", "America/Los_Angeles|America/Vancouver", "America/Los_Angeles|America/Whitehorse", "America/Los_Angeles|Canada/Pacific", "America/Los_Angeles|Canada/Yukon", "America/Los_Angeles|Mexico/BajaNorte", "America/Los_Angeles|PST8PDT", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Managua|America/Belize", "America/Managua|America/Costa_Rica", "America/Managua|America/El_Salvador", "America/Managua|America/Guatemala", "America/Managua|America/Regina", "America/Managua|America/Swift_Current", "America/Managua|America/Tegucigalpa", "America/Managua|Canada/East-Saskatchewan", "America/Managua|Canada/Saskatchewan", "America/Manaus|America/Boa_Vista", "America/Manaus|America/Porto_Velho", "America/Manaus|Brazil/West", "America/Mexico_City|America/Merida", "America/Mexico_City|America/Monterrey", "America/Mexico_City|Mexico/General", "America/New_York|America/Detroit", "America/New_York|America/Fort_Wayne", "America/New_York|America/Indiana/Indianapolis", "America/New_York|America/Indiana/Marengo", "America/New_York|America/Indiana/Petersburg", "America/New_York|America/Indiana/Vevay", "America/New_York|America/Indiana/Vincennes", "America/New_York|America/Indiana/Winamac", "America/New_York|America/Indianapolis", "America/New_York|America/Iqaluit", "America/New_York|America/Kentucky/Louisville", "America/New_York|America/Kentucky/Monticello", "America/New_York|America/Louisville", "America/New_York|America/Montreal", "America/New_York|America/Nassau", "America/New_York|America/Nipigon", "America/New_York|America/Pangnirtung", "America/New_York|America/Thunder_Bay", "America/New_York|America/Toronto", "America/New_York|Canada/Eastern", "America/New_York|EST5EDT", "America/New_York|US/East-Indiana", "America/New_York|US/Eastern", "America/New_York|US/Michigan", "America/Noronha|Brazil/DeNoronha", "America/Panama|America/Atikokan", "America/Panama|America/Cayman", "America/Panama|America/Coral_Harbour", "America/Panama|America/Jamaica", "America/Panama|EST", "America/Panama|Jamaica", "America/Phoenix|America/Creston", "America/Phoenix|America/Dawson_Creek", "America/Phoenix|America/Hermosillo", "America/Phoenix|MST", "America/Phoenix|US/Arizona", "America/Rio_Branco|America/Eirunepe", "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Antarctica/Palmer", "America/Santiago|Chile/Continental", "America/Santo_Domingo|America/Anguilla", "America/Santo_Domingo|America/Antigua", "America/Santo_Domingo|America/Aruba", "America/Santo_Domingo|America/Barbados", "America/Santo_Domingo|America/Blanc-Sablon", "America/Santo_Domingo|America/Curacao", "America/Santo_Domingo|America/Dominica", "America/Santo_Domingo|America/Grenada", "America/Santo_Domingo|America/Guadeloupe", "America/Santo_Domingo|America/Kralendijk", "America/Santo_Domingo|America/Lower_Princes", "America/Santo_Domingo|America/Marigot", "America/Santo_Domingo|America/Martinique", "America/Santo_Domingo|America/Montserrat", "America/Santo_Domingo|America/Port_of_Spain", "America/Santo_Domingo|America/Puerto_Rico", "America/Santo_Domingo|America/St_Barthelemy", "America/Santo_Domingo|America/St_Kitts", "America/Santo_Domingo|America/St_Lucia", "America/Santo_Domingo|America/St_Thomas", "America/Santo_Domingo|America/St_Vincent", "America/Santo_Domingo|America/Tortola", "America/Santo_Domingo|America/Virgin", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "Antarctica/DumontDUrville|Etc/GMT-10", "Antarctica/Rothera|Etc/GMT+3", "Antarctica/Syowa|Etc/GMT-3", "Asia/Almaty|Antarctica/Vostok", "Asia/Almaty|Asia/Bishkek", "Asia/Almaty|Asia/Qyzylorda", "Asia/Almaty|Etc/GMT-6", "Asia/Baghdad|Asia/Aden", "Asia/Baghdad|Asia/Bahrain", "Asia/Baghdad|Asia/Kuwait", "Asia/Baghdad|Asia/Qatar", "Asia/Baghdad|Asia/Riyadh", "Asia/Bangkok|Asia/Ho_Chi_Minh", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Saigon", "Asia/Bangkok|Asia/Vientiane", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Hong_Kong|Hongkong", "Asia/Jakarta|Asia/Pontianak", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kamchatka|Asia/Anadyr", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Kuala_Lumpur|Asia/Kuching", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Rangoon|Asia/Yangon", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|Asia/Macao", "Asia/Shanghai|Asia/Macau", "Asia/Shanghai|Asia/Taipei", "Asia/Shanghai|PRC", "Asia/Shanghai|ROC", "Asia/Singapore|Singapore", "Asia/Tashkent|Antarctica/Mawson", "Asia/Tashkent|Asia/Aqtau", "Asia/Tashkent|Asia/Aqtobe", "Asia/Tashkent|Asia/Ashgabat", "Asia/Tashkent|Asia/Ashkhabad", "Asia/Tashkent|Asia/Atyrau", "Asia/Tashkent|Asia/Dushanbe", "Asia/Tashkent|Asia/Oral", "Asia/Tashkent|Asia/Samarkand", "Asia/Tashkent|Etc/GMT-5", "Asia/Tashkent|Indian/Kerguelen", "Asia/Tbilisi|Etc/GMT-4", "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Asia/Kashgar", "Australia/Adelaide|Australia/Broken_Hill", "Australia/Adelaide|Australia/South", "Australia/Adelaide|Australia/Yancowinna", "Australia/Brisbane|Australia/Lindeman", "Australia/Brisbane|Australia/Queensland", "Australia/Darwin|Australia/North", "Australia/Lord_Howe|Australia/LHI", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/Currie", "Australia/Sydney|Australia/Hobart", "Australia/Sydney|Australia/Melbourne", "Australia/Sydney|Australia/NSW", "Australia/Sydney|Australia/Tasmania", "Australia/Sydney|Australia/Victoria", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Astrakhan|Europe/Ulyanovsk", "Europe/Athens|Asia/Nicosia", "Europe/Athens|EET", "Europe/Athens|Europe/Bucharest", "Europe/Athens|Europe/Helsinki", "Europe/Athens|Europe/Kiev", "Europe/Athens|Europe/Mariehamn", "Europe/Athens|Europe/Nicosia", "Europe/Athens|Europe/Riga", "Europe/Athens|Europe/Sofia", "Europe/Athens|Europe/Tallinn", "Europe/Athens|Europe/Uzhgorod", "Europe/Athens|Europe/Vilnius", "Europe/Athens|Europe/Zaporozhye", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Atlantic/Canary", "Europe/Lisbon|Atlantic/Faeroe", "Europe/Lisbon|Atlantic/Faroe", "Europe/Lisbon|Atlantic/Madeira", "Europe/Lisbon|Portugal", "Europe/Lisbon|WET", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Paris|Africa/Ceuta", "Europe/Paris|Arctic/Longyearbyen", "Europe/Paris|Atlantic/Jan_Mayen", "Europe/Paris|CET", "Europe/Paris|Europe/Amsterdam", "Europe/Paris|Europe/Andorra", "Europe/Paris|Europe/Belgrade", "Europe/Paris|Europe/Berlin", "Europe/Paris|Europe/Bratislava", "Europe/Paris|Europe/Brussels", "Europe/Paris|Europe/Budapest", "Europe/Paris|Europe/Busingen", "Europe/Paris|Europe/Copenhagen", "Europe/Paris|Europe/Gibraltar", "Europe/Paris|Europe/Ljubljana", "Europe/Paris|Europe/Luxembourg", "Europe/Paris|Europe/Madrid", "Europe/Paris|Europe/Malta", "Europe/Paris|Europe/Monaco", "Europe/Paris|Europe/Oslo", "Europe/Paris|Europe/Podgorica", "Europe/Paris|Europe/Prague", "Europe/Paris|Europe/Rome", "Europe/Paris|Europe/San_Marino", "Europe/Paris|Europe/Sarajevo", "Europe/Paris|Europe/Skopje", "Europe/Paris|Europe/Stockholm", "Europe/Paris|Europe/Tirane", "Europe/Paris|Europe/Vaduz", "Europe/Paris|Europe/Vatican", "Europe/Paris|Europe/Vienna", "Europe/Paris|Europe/Warsaw", "Europe/Paris|Europe/Zagreb", "Europe/Paris|Europe/Zurich", "Europe/Paris|Poland", "Europe/Volgograd|Europe/Kirov", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Easter|Chile/EasterIsland", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|HST", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Majuro|Kwajalein", "Pacific/Majuro|Pacific/Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Pohnpei|Pacific/Ponape"]
        }),
        e
    })
})
  , fp = tt
  , dp = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  , hp = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  , pp = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  , mp = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  , gp = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  , vp = "AM"
  , yp = "PM"
  , bp = "am"
  , _p = "pm"
  , wp = new RegExp(dp.join("|"),"i")
  , Ap = new RegExp(hp.join("|"),"i")
  , xp = new RegExp("\\b(" + pp.join("|") + ")\\b","i")
  , Mp = new RegExp(mp.join("|"),"i")
  , kp = new RegExp(gp.join("|"),"i")
  , Tp = /(\d+)(st|nd|rd|th)\b/i
  , Sp = /(\d{1,4})([\/\.\-])(\d{1,2})[\/\.\-](\d{1,4})/
  , Ep = /((\+|\-)\d\d:?\d\d)$/
  , Cp = "(" + [vp, yp].join("|") + ")"
  , Op = "(" + [bp, _p].join("|") + ")"
  , Dp = new RegExp(Op)
  , jp = new RegExp(Cp)
  , Pp = new RegExp("0\\d\\:\\d{1,2}\\:\\d{1,2}(\\s*)" + Cp,"i")
  , zp = new RegExp("0\\d\\:\\d{1,2}(\\s*)" + Cp,"i")
  , Np = new RegExp("0\\d(\\s*)" + Cp,"i")
  , Wp = new RegExp("\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}(\\s*)" + Cp,"i")
  , Lp = new RegExp("\\d{1,2}\\:\\d{1,2}(\\s*)" + Cp,"i")
  , Rp = new RegExp("\\d{1,2}(\\s*)" + Cp,"i")
  , qp = /\d{2}:\d{2}:\d{2}\.\d{3}/
  , Yp = /\d{2}:\d{2}:\d{2}\.\d{2}/
  , Bp = /\d{2}:\d{2}:\d{2}\.\d{1}/
  , Hp = /0\d:\d{2}:\d{2}/
  , Fp = /0\d:\d{2}/
  , Ip = /\d{1,2}:\d{2}:\d{2}/
  , Up = /\d{1,2}:\d{2}:\d{2}\.\d{3}/
  , Gp = /\d{1,2}:\d{2}:\d{2}\.\d{2}/
  , $p = /\d{1,2}:\d{2}:\d{2}\.\d{1}/
  , Vp = /\d{1,2}:\d{2}/
  , Kp = /\d{4}/
  , Xp = /0\d/
  , Jp = /\d{1,2}/
  , Zp = /\d{2}/
  , Qp = /^([1-9])\/([1-9]|0[1-9])$/
  , em = /^([1-9])\/(1[012])$/
  , tm = /^(0[1-9]|[12][0-9]|3[01])\/([1-9])$/
  , nm = /^(0[1-9]|[12][0-9]|3[01])\/(1[012]|0[1-9])$/
  , rm = /^([1-9])\/([1-9][0-9])$/
  , am = /^(0[1-9]|1[012])\/([1-9][0-9])$/
  , im = /([\/][M]|[M][\/]|[MM]|[MMMM])/
  , om = /\b(at)\b/i
  , sm = /\d{13}/
  , um = /\d{10}/
  , cm = {
    "/": "MDY",
    ".": "DMY",
    "-": "YMD"
}
  , lm = fp
  , fm = lm;
"undefined" != typeof window && window.moment && (window.moment.parseFormat = lm);
var dm = n(function(e, t) {
    (function() {
        function n(e, t, n) {
            for (var r = (n || 0) - 1, a = e ? e.length : 0; ++r < a; )
                if (e[r] === t)
                    return r;
            return -1
        }
        function r(e, t) {
            var r = typeof t;
            if (e = e.cache,
            "boolean" == r || null == t)
                return e[t] ? 0 : -1;
            "number" != r && "string" != r && (r = "object");
            var a = "number" == r ? t : b + t;
            return e = (e = e[r]) && e[a],
            "object" == r ? e && n(e, t) > -1 ? 0 : -1 : e ? 0 : -1
        }
        function a(e) {
            var t = this.cache
              , n = typeof e;
            if ("boolean" == n || null == e)
                t[e] = !0;
            else {
                "number" != n && "string" != n && (n = "object");
                var r = "number" == n ? e : b + e
                  , a = t[n] || (t[n] = {});
                "object" == n ? (a[r] || (a[r] = [])).push(e) : a[r] = !0
            }
        }
        function i(e) {
            return e.charCodeAt(0)
        }
        function o(e, t) {
            for (var n = e.criteria, r = t.criteria, a = -1, i = n.length; ++a < i; ) {
                var o = n[a]
                  , s = r[a];
                if (o !== s) {
                    if (o > s || "undefined" == typeof o)
                        return 1;
                    if (o < s || "undefined" == typeof s)
                        return -1
                }
            }
            return e.index - t.index
        }
        function s(e) {
            var t = -1
              , n = e.length
              , r = e[0]
              , i = e[n / 2 | 0]
              , o = e[n - 1];
            if (r && "object" == typeof r && i && "object" == typeof i && o && "object" == typeof o)
                return !1;
            var s = l();
            s.false = s.null = s.true = s.undefined = !1;
            var u = l();
            for (u.array = e,
            u.cache = s,
            u.push = a; ++t < n; )
                u.push(e[t]);
            return u
        }
        function u(e) {
            return "\\" + K[e]
        }
        function c() {
            return g.pop() || []
        }
        function l() {
            return v.pop() || {
                array: null,
                cache: null,
                criteria: null,
                false: !1,
                index: 0,
                null: !1,
                number: null,
                object: null,
                push: null,
                string: null,
                true: !1,
                undefined: !1,
                value: null
            }
        }
        function f(e) {
            e.length = 0,
            g.length < w && g.push(e)
        }
        function d(e) {
            var t = e.cache;
            t && d(t),
            e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null,
            v.length < w && v.push(e)
        }
        function h(e, t, n) {
            t || (t = 0),
            "undefined" == typeof n && (n = e ? e.length : 0);
            for (var r = -1, a = n - t || 0, i = Array(a < 0 ? 0 : a); ++r < a; )
                i[r] = e[t + r];
            return i
        }
        function p(e) {
            function t(e) {
                return e && "object" == typeof e && !Zn(e) && zn.call(e, "__wrapped__") ? e : new a(e)
            }
            function a(e, t) {
                this.__chain__ = !!t,
                this.__wrapped__ = e
            }
            function g(e) {
                function t() {
                    if (r) {
                        var e = h(r);
                        Nn.apply(e, arguments)
                    }
                    if (this instanceof t) {
                        var i = w(n.prototype)
                          , o = n.apply(i, e || arguments);
                        return Oe(o) ? o : i
                    }
                    return n.apply(a, e || arguments)
                }
                var n = e[0]
                  , r = e[2]
                  , a = e[4];
                return Jn(t, e),
                t
            }
            function v(e, t, n, r, a) {
                if (n) {
                    var i = n(e);
                    if ("undefined" != typeof i)
                        return i
                }
                var o = Oe(e);
                if (!o)
                    return e;
                var s = Sn.call(e);
                if (!U[s])
                    return e;
                var u = Kn[s];
                switch (s) {
                case R:
                case q:
                    return new u(+e);
                case B:
                case I:
                    return new u(e);
                case F:
                    return i = u(e.source, S.exec(e)),
                    i.lastIndex = e.lastIndex,
                    i
                }
                var l = Zn(e);
                if (t) {
                    var d = !r;
                    r || (r = c()),
                    a || (a = c());
                    for (var p = r.length; p--; )
                        if (r[p] == e)
                            return a[p];
                    i = l ? u(e.length) : {}
                } else
                    i = l ? h(e) : ir({}, e);
                return l && (zn.call(e, "index") && (i.index = e.index),
                zn.call(e, "input") && (i.input = e.input)),
                t ? (r.push(e),
                a.push(i),
                (l ? Xe : ur)(e, function(e, o) {
                    i[o] = v(e, t, n, r, a)
                }),
                d && (f(r),
                f(a)),
                i) : i
            }
            function w(e, t) {
                return Oe(e) ? Yn(e) : {}
            }
            function K(e, t, n) {
                if ("function" != typeof e)
                    return Jt;
                if ("undefined" == typeof t || !("prototype"in e))
                    return e;
                var r = e.__bindData__;
                if ("undefined" == typeof r && (Xn.funcNames && (r = !e.name),
                r = r || !Xn.funcDecomp,
                !r)) {
                    var a = jn.call(e);
                    Xn.funcNames || (r = !E.test(a)),
                    r || (r = j.test(a),
                    Jn(e, r))
                }
                if (r === !1 || r !== !0 && 1 & r[1])
                    return e;
                switch (n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    }
                    ;
                case 2:
                    return function(n, r) {
                        return e.call(t, n, r)
                    }
                    ;
                case 3:
                    return function(n, r, a) {
                        return e.call(t, n, r, a)
                    }
                    ;
                case 4:
                    return function(n, r, a, i) {
                        return e.call(t, n, r, a, i)
                    }
                }
                return zt(e, t)
            }
            function J(e) {
                function t() {
                    var e = u ? o : this;
                    if (a) {
                        var p = h(a);
                        Nn.apply(p, arguments)
                    }
                    if ((i || l) && (p || (p = h(arguments)),
                    i && Nn.apply(p, i),
                    l && p.length < s))
                        return r |= 16,
                        J([n, f ? r : r & -4, p, null, o, s]);
                    if (p || (p = arguments),
                    c && (n = e[d]),
                    this instanceof t) {
                        e = w(n.prototype);
                        var m = n.apply(e, p);
                        return Oe(m) ? m : e
                    }
                    return n.apply(e, p)
                }
                var n = e[0]
                  , r = e[1]
                  , a = e[2]
                  , i = e[3]
                  , o = e[4]
                  , s = e[5]
                  , u = 1 & r
                  , c = 2 & r
                  , l = 4 & r
                  , f = 8 & r
                  , d = n;
                return Jn(t, e),
                t
            }
            function Z(e, t) {
                var a = -1
                  , i = ue()
                  , o = e ? e.length : 0
                  , u = o >= _ && i === n
                  , c = [];
                if (u) {
                    var l = s(t);
                    l ? (i = r,
                    t = l) : u = !1
                }
                for (; ++a < o; ) {
                    var f = e[a];
                    i(t, f) < 0 && c.push(f)
                }
                return u && d(t),
                c
            }
            function Q(e, t, n, r) {
                for (var a = (r || 0) - 1, i = e ? e.length : 0, o = []; ++a < i; ) {
                    var s = e[a];
                    if (s && "object" == typeof s && "number" == typeof s.length && (Zn(s) || de(s))) {
                        t || (s = Q(s, t, n));
                        var u = -1
                          , c = s.length
                          , l = o.length;
                        for (o.length += c; ++u < c; )
                            o[l++] = s[u]
                    } else
                        n || o.push(s)
                }
                return o
            }
            function ee(e, t, n, r, a, i) {
                if (n) {
                    var o = n(e, t);
                    if ("undefined" != typeof o)
                        return !!o
                }
                if (e === t)
                    return 0 !== e || 1 / e == 1 / t;
                var s = typeof e
                  , u = typeof t;
                if (!(e !== e || e && V[s] || t && V[u]))
                    return !1;
                if (null == e || null == t)
                    return e === t;
                var l = Sn.call(e)
                  , d = Sn.call(t);
                if (l == W && (l = H),
                d == W && (d = H),
                l != d)
                    return !1;
                switch (l) {
                case R:
                case q:
                    return +e == +t;
                case B:
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case F:
                case I:
                    return e == An(t)
                }
                var h = l == L;
                if (!h) {
                    var p = zn.call(e, "__wrapped__")
                      , m = zn.call(t, "__wrapped__");
                    if (p || m)
                        return ee(p ? e.__wrapped__ : e, m ? t.__wrapped__ : t, n, r, a, i);
                    if (l != H)
                        return !1;
                    var g = e.constructor
                      , v = t.constructor;
                    if (g != v && !(Ce(g) && g instanceof g && Ce(v) && v instanceof v) && "constructor"in e && "constructor"in t)
                        return !1
                }
                var y = !a;
                a || (a = c()),
                i || (i = c());
                for (var b = a.length; b--; )
                    if (a[b] == e)
                        return i[b] == t;
                var _ = 0;
                if (o = !0,
                a.push(e),
                i.push(t),
                h) {
                    if (b = e.length,
                    _ = t.length,
                    o = _ == b,
                    o || r)
                        for (; _--; ) {
                            var w = b
                              , A = t[_];
                            if (r)
                                for (; w-- && !(o = ee(e[w], A, n, r, a, i)); )
                                    ;
                            else if (!(o = ee(e[_], A, n, r, a, i)))
                                break
                        }
                } else
                    sr(t, function(t, s, u) {
                        if (zn.call(u, s))
                            return _++,
                            o = zn.call(e, s) && ee(e[s], t, n, r, a, i)
                    }),
                    o && !r && sr(e, function(e, t, n) {
                        if (zn.call(n, t))
                            return o = --_ > -1
                    });
                return a.pop(),
                i.pop(),
                y && (f(a),
                f(i)),
                o
            }
            function ne(e, t, n, r, a) {
                (Zn(t) ? Xe : ur)(t, function(t, i) {
                    var o, s, u = t, c = e[i];
                    if (t && ((s = Zn(t)) || cr(t))) {
                        for (var l = r.length; l--; )
                            if (o = r[l] == t) {
                                c = a[l];
                                break
                            }
                        if (!o) {
                            var f;
                            n && (u = n(c, t),
                            (f = "undefined" != typeof u) && (c = u)),
                            f || (c = s ? Zn(c) ? c : [] : cr(c) ? c : {}),
                            r.push(t),
                            a.push(c),
                            f || ne(c, t, n, r, a)
                        }
                    } else
                        n && (u = n(c, t),
                        "undefined" == typeof u && (u = t)),
                        "undefined" != typeof u && (c = u);
                    e[i] = c
                })
            }
            function re(e, t) {
                return e + Dn(Vn() * (t - e + 1))
            }
            function ae(e, t, a) {
                var i = -1
                  , o = ue()
                  , u = e ? e.length : 0
                  , l = []
                  , h = !t && u >= _ && o === n
                  , p = a || h ? c() : l;
                if (h) {
                    var m = s(p);
                    o = r,
                    p = m
                }
                for (; ++i < u; ) {
                    var g = e[i]
                      , v = a ? a(g, i, e) : g;
                    (t ? !i || p[p.length - 1] !== v : o(p, v) < 0) && ((a || h) && p.push(v),
                    l.push(g))
                }
                return h ? (f(p.array),
                d(p)) : a && f(p),
                l
            }
            function ie(e) {
                return function(n, r, a) {
                    var i = {};
                    r = t.createCallback(r, a, 3);
                    var o = -1
                      , s = n ? n.length : 0;
                    if ("number" == typeof s)
                        for (; ++o < s; ) {
                            var u = n[o];
                            e(i, u, r(u, o, n), n)
                        }
                    else
                        ur(n, function(t, n, a) {
                            e(i, t, r(t, n, a), a)
                        });
                    return i
                }
            }
            function oe(e, t, n, r, a, i) {
                var o = 1 & t
                  , s = 2 & t
                  , u = 4 & t
                  , c = 16 & t
                  , l = 32 & t;
                if (!s && !Ce(e))
                    throw new xn;
                c && !n.length && (t &= -17,
                c = n = !1),
                l && !r.length && (t &= -33,
                l = r = !1);
                var f = e && e.__bindData__;
                if (f && f !== !0)
                    return f = h(f),
                    f[2] && (f[2] = h(f[2])),
                    f[3] && (f[3] = h(f[3])),
                    !o || 1 & f[1] || (f[4] = a),
                    !o && 1 & f[1] && (t |= 8),
                    !u || 4 & f[1] || (f[5] = i),
                    c && Nn.apply(f[2] || (f[2] = []), n),
                    l && Rn.apply(f[3] || (f[3] = []), r),
                    f[1] |= t,
                    oe.apply(null, f);
                var d = 1 == t || 17 === t ? g : J;
                return d([e, t, n, r, a, i])
            }
            function se(e) {
                return tr[e]
            }
            function ue() {
                var e = (e = t.indexOf) === vt ? n : e;
                return e
            }
            function ce(e) {
                return "function" == typeof e && En.test(e)
            }
            function le(e) {
                var t, n;
                return !!(e && Sn.call(e) == H && (t = e.constructor,
                !Ce(t) || t instanceof t)) && (sr(e, function(e, t) {
                    n = t
                }),
                "undefined" == typeof n || zn.call(e, n))
            }
            function fe(e) {
                return nr[e]
            }
            function de(e) {
                return e && "object" == typeof e && "number" == typeof e.length && Sn.call(e) == W || !1
            }
            function he(e, t, n, r) {
                return "boolean" != typeof t && null != t && (r = n,
                n = t,
                t = !1),
                v(e, t, "function" == typeof n && K(n, r, 1))
            }
            function pe(e, t, n) {
                return v(e, !0, "function" == typeof t && K(t, n, 1))
            }
            function me(e, t) {
                var n = w(e);
                return t ? ir(n, t) : n
            }
            function ge(e, n, r) {
                var a;
                return n = t.createCallback(n, r, 3),
                ur(e, function(e, t, r) {
                    if (n(e, t, r))
                        return a = t,
                        !1
                }),
                a
            }
            function ve(e, n, r) {
                var a;
                return n = t.createCallback(n, r, 3),
                be(e, function(e, t, r) {
                    if (n(e, t, r))
                        return a = t,
                        !1
                }),
                a
            }
            function ye(e, t, n) {
                var r = [];
                sr(e, function(e, t) {
                    r.push(t, e)
                });
                var a = r.length;
                for (t = K(t, n, 3); a-- && t(r[a--], r[a], e) !== !1; )
                    ;
                return e
            }
            function be(e, t, n) {
                var r = er(e)
                  , a = r.length;
                for (t = K(t, n, 3); a--; ) {
                    var i = r[a];
                    if (t(e[i], i, e) === !1)
                        break
                }
                return e
            }
            function _e(e) {
                var t = [];
                return sr(e, function(e, n) {
                    Ce(e) && t.push(n)
                }),
                t.sort()
            }
            function we(e, t) {
                return !!e && zn.call(e, t)
            }
            function Ae(e) {
                for (var t = -1, n = er(e), r = n.length, a = {}; ++t < r; ) {
                    var i = n[t];
                    a[e[i]] = i
                }
                return a
            }
            function xe(e) {
                return e === !0 || e === !1 || e && "object" == typeof e && Sn.call(e) == R || !1
            }
            function Me(e) {
                return e && "object" == typeof e && Sn.call(e) == q || !1
            }
            function ke(e) {
                return e && 1 === e.nodeType || !1
            }
            function Te(e) {
                var t = !0;
                if (!e)
                    return t;
                var n = Sn.call(e)
                  , r = e.length;
                return n == L || n == I || n == W || n == H && "number" == typeof r && Ce(e.splice) ? !r : (ur(e, function() {
                    return t = !1
                }),
                t)
            }
            function Se(e, t, n, r) {
                return ee(e, t, "function" == typeof n && K(n, r, 2))
            }
            function Ee(e) {
                return Hn(e) && !Fn(parseFloat(e))
            }
            function Ce(e) {
                return "function" == typeof e
            }
            function Oe(e) {
                return !(!e || !V[typeof e])
            }
            function De(e) {
                return Pe(e) && e != +e
            }
            function je(e) {
                return null === e
            }
            function Pe(e) {
                return "number" == typeof e || e && "object" == typeof e && Sn.call(e) == B || !1
            }
            function ze(e) {
                return e && "object" == typeof e && Sn.call(e) == F || !1
            }
            function Ne(e) {
                return "string" == typeof e || e && "object" == typeof e && Sn.call(e) == I || !1
            }
            function We(e) {
                return "undefined" == typeof e
            }
            function Le(e, n, r) {
                var a = {};
                return n = t.createCallback(n, r, 3),
                ur(e, function(e, t, r) {
                    a[t] = n(e, t, r)
                }),
                a
            }
            function Re(e) {
                var t = arguments
                  , n = 2;
                if (!Oe(e))
                    return e;
                if ("number" != typeof t[2] && (n = t.length),
                n > 3 && "function" == typeof t[n - 2])
                    var r = K(t[--n - 1], t[n--], 2);
                else
                    n > 2 && "function" == typeof t[n - 1] && (r = t[--n]);
                for (var a = h(arguments, 1, n), i = -1, o = c(), s = c(); ++i < n; )
                    ne(e, a[i], r, o, s);
                return f(o),
                f(s),
                e
            }
            function qe(e, n, r) {
                var a = {};
                if ("function" != typeof n) {
                    var i = [];
                    sr(e, function(e, t) {
                        i.push(t)
                    }),
                    i = Z(i, Q(arguments, !0, !1, 1));
                    for (var o = -1, s = i.length; ++o < s; ) {
                        var u = i[o];
                        a[u] = e[u]
                    }
                } else
                    n = t.createCallback(n, r, 3),
                    sr(e, function(e, t, r) {
                        n(e, t, r) || (a[t] = e)
                    });
                return a
            }
            function Ye(e) {
                for (var t = -1, n = er(e), r = n.length, a = pn(r); ++t < r; ) {
                    var i = n[t];
                    a[t] = [i, e[i]]
                }
                return a
            }
            function Be(e, n, r) {
                var a = {};
                if ("function" != typeof n)
                    for (var i = -1, o = Q(arguments, !0, !1, 1), s = Oe(e) ? o.length : 0; ++i < s; ) {
                        var u = o[i];
                        u in e && (a[u] = e[u])
                    }
                else
                    n = t.createCallback(n, r, 3),
                    sr(e, function(e, t, r) {
                        n(e, t, r) && (a[t] = e)
                    });
                return a
            }
            function He(e, n, r, a) {
                var i = Zn(e);
                if (null == r)
                    if (i)
                        r = [];
                    else {
                        var o = e && e.constructor
                          , s = o && o.prototype;
                        r = w(s)
                    }
                return n && (n = t.createCallback(n, a, 4),
                (i ? Xe : ur)(e, function(e, t, a) {
                    return n(r, e, t, a)
                })),
                r
            }
            function Fe(e) {
                for (var t = -1, n = er(e), r = n.length, a = pn(r); ++t < r; )
                    a[t] = e[n[t]];
                return a
            }
            function Ie(e) {
                for (var t = arguments, n = -1, r = Q(t, !0, !1, 1), a = t[2] && t[2][t[1]] === e ? 1 : r.length, i = pn(a); ++n < a; )
                    i[n] = e[r[n]];
                return i
            }
            function Ue(e, t, n) {
                var r = -1
                  , a = ue()
                  , i = e ? e.length : 0
                  , o = !1;
                return n = (n < 0 ? Un(0, i + n) : n) || 0,
                Zn(e) ? o = a(e, t, n) > -1 : "number" == typeof i ? o = (Ne(e) ? e.indexOf(t, n) : a(e, t, n)) > -1 : ur(e, function(e) {
                    if (++r >= n)
                        return !(o = e === t)
                }),
                o
            }
            function Ge(e, n, r) {
                var a = !0;
                n = t.createCallback(n, r, 3);
                var i = -1
                  , o = e ? e.length : 0;
                if ("number" == typeof o)
                    for (; ++i < o && (a = !!n(e[i], i, e)); )
                        ;
                else
                    ur(e, function(e, t, r) {
                        return a = !!n(e, t, r)
                    });
                return a
            }
            function $e(e, n, r) {
                var a = [];
                n = t.createCallback(n, r, 3);
                var i = -1
                  , o = e ? e.length : 0;
                if ("number" == typeof o)
                    for (; ++i < o; ) {
                        var s = e[i];
                        n(s, i, e) && a.push(s)
                    }
                else
                    ur(e, function(e, t, r) {
                        n(e, t, r) && a.push(e)
                    });
                return a
            }
            function Ve(e, n, r) {
                n = t.createCallback(n, r, 3);
                var a = -1
                  , i = e ? e.length : 0;
                if ("number" != typeof i) {
                    var o;
                    return ur(e, function(e, t, r) {
                        if (n(e, t, r))
                            return o = e,
                            !1
                    }),
                    o
                }
                for (; ++a < i; ) {
                    var s = e[a];
                    if (n(s, a, e))
                        return s
                }
            }
            function Ke(e, n, r) {
                var a;
                return n = t.createCallback(n, r, 3),
                Je(e, function(e, t, r) {
                    if (n(e, t, r))
                        return a = e,
                        !1
                }),
                a
            }
            function Xe(e, t, n) {
                var r = -1
                  , a = e ? e.length : 0;
                if (t = t && "undefined" == typeof n ? t : K(t, n, 3),
                "number" == typeof a)
                    for (; ++r < a && t(e[r], r, e) !== !1; )
                        ;
                else
                    ur(e, t);
                return e
            }
            function Je(e, t, n) {
                var r = e ? e.length : 0;
                if (t = t && "undefined" == typeof n ? t : K(t, n, 3),
                "number" == typeof r)
                    for (; r-- && t(e[r], r, e) !== !1; )
                        ;
                else {
                    var a = er(e);
                    r = a.length,
                    ur(e, function(e, n, i) {
                        return n = a ? a[--r] : --r,
                        t(i[n], n, i)
                    })
                }
                return e
            }
            function Ze(e, t) {
                var n = h(arguments, 2)
                  , r = -1
                  , a = "function" == typeof t
                  , i = e ? e.length : 0
                  , o = pn("number" == typeof i ? i : 0);
                return Xe(e, function(e) {
                    o[++r] = (a ? t : e[t]).apply(e, n)
                }),
                o
            }
            function Qe(e, n, r) {
                var a = -1
                  , i = e ? e.length : 0;
                if (n = t.createCallback(n, r, 3),
                "number" == typeof i)
                    for (var o = pn(i); ++a < i; )
                        o[a] = n(e[a], a, e);
                else
                    o = [],
                    ur(e, function(e, t, r) {
                        o[++a] = n(e, t, r)
                    });
                return o
            }
            function et(e, n, r) {
                var a = -(1 / 0)
                  , o = a;
                if ("function" != typeof n && r && r[n] === e && (n = null),
                null == n && Zn(e))
                    for (var s = -1, u = e.length; ++s < u; ) {
                        var c = e[s];
                        c > o && (o = c)
                    }
                else
                    n = null == n && Ne(e) ? i : t.createCallback(n, r, 3),
                    Xe(e, function(e, t, r) {
                        var i = n(e, t, r);
                        i > a && (a = i,
                        o = e)
                    });
                return o
            }
            function tt(e, n, r) {
                var a = 1 / 0
                  , o = a;
                if ("function" != typeof n && r && r[n] === e && (n = null),
                null == n && Zn(e))
                    for (var s = -1, u = e.length; ++s < u; ) {
                        var c = e[s];
                        c < o && (o = c)
                    }
                else
                    n = null == n && Ne(e) ? i : t.createCallback(n, r, 3),
                    Xe(e, function(e, t, r) {
                        var i = n(e, t, r);
                        i < a && (a = i,
                        o = e)
                    });
                return o
            }
            function nt(e, n, r, a) {
                if (!e)
                    return r;
                var i = arguments.length < 3;
                n = t.createCallback(n, a, 4);
                var o = -1
                  , s = e.length;
                if ("number" == typeof s)
                    for (i && (r = e[++o]); ++o < s; )
                        r = n(r, e[o], o, e);
                else
                    ur(e, function(e, t, a) {
                        r = i ? (i = !1,
                        e) : n(r, e, t, a)
                    });
                return r
            }
            function rt(e, n, r, a) {
                var i = arguments.length < 3;
                return n = t.createCallback(n, a, 4),
                Je(e, function(e, t, a) {
                    r = i ? (i = !1,
                    e) : n(r, e, t, a)
                }),
                r
            }
            function at(e, n, r) {
                return n = t.createCallback(n, r, 3),
                $e(e, function(e, t, r) {
                    return !n(e, t, r)
                })
            }
            function it(e, t, n) {
                if (e && "number" != typeof e.length && (e = Fe(e)),
                null == t || n)
                    return e ? e[re(0, e.length - 1)] : m;
                var r = ot(e);
                return r.length = Gn(Un(0, t), r.length),
                r
            }
            function ot(e) {
                var t = -1
                  , n = e ? e.length : 0
                  , r = pn("number" == typeof n ? n : 0);
                return Xe(e, function(e) {
                    var n = re(0, ++t);
                    r[t] = r[n],
                    r[n] = e
                }),
                r
            }
            function st(e) {
                var t = e ? e.length : 0;
                return "number" == typeof t ? t : er(e).length
            }
            function ut(e, n, r) {
                var a;
                n = t.createCallback(n, r, 3);
                var i = -1
                  , o = e ? e.length : 0;
                if ("number" == typeof o)
                    for (; ++i < o && !(a = n(e[i], i, e)); )
                        ;
                else
                    ur(e, function(e, t, r) {
                        return !(a = n(e, t, r))
                    });
                return !!a
            }
            function ct(e, n, r) {
                var a = -1
                  , i = Zn(n)
                  , s = e ? e.length : 0
                  , u = pn("number" == typeof s ? s : 0);
                for (i || (n = t.createCallback(n, r, 3)),
                Xe(e, function(e, t, r) {
                    var o = u[++a] = l();
                    i ? o.criteria = Qe(n, function(t) {
                        return e[t]
                    }) : (o.criteria = c())[0] = n(e, t, r),
                    o.index = a,
                    o.value = e
                }),
                s = u.length,
                u.sort(o); s--; ) {
                    var h = u[s];
                    u[s] = h.value,
                    i || f(h.criteria),
                    d(h)
                }
                return u
            }
            function lt(e) {
                return e && "number" == typeof e.length ? h(e) : Fe(e)
            }
            function ft(e) {
                for (var t = -1, n = e ? e.length : 0, r = []; ++t < n; ) {
                    var a = e[t];
                    a && r.push(a)
                }
                return r
            }
            function dt(e) {
                return Z(e, Q(arguments, !0, !0, 1))
            }
            function ht(e, n, r) {
                var a = -1
                  , i = e ? e.length : 0;
                for (n = t.createCallback(n, r, 3); ++a < i; )
                    if (n(e[a], a, e))
                        return a;
                return -1
            }
            function pt(e, n, r) {
                var a = e ? e.length : 0;
                for (n = t.createCallback(n, r, 3); a--; )
                    if (n(e[a], a, e))
                        return a;
                return -1
            }
            function mt(e, n, r) {
                var a = 0
                  , i = e ? e.length : 0;
                if ("number" != typeof n && null != n) {
                    var o = -1;
                    for (n = t.createCallback(n, r, 3); ++o < i && n(e[o], o, e); )
                        a++
                } else if (a = n,
                null == a || r)
                    return e ? e[0] : m;
                return h(e, 0, Gn(Un(0, a), i))
            }
            function gt(e, t, n, r) {
                return "boolean" != typeof t && null != t && (r = n,
                n = "function" != typeof t && r && r[t] === e ? null : t,
                t = !1),
                null != n && (e = Qe(e, n, r)),
                Q(e, t)
            }
            function vt(e, t, r) {
                if ("number" == typeof r) {
                    var a = e ? e.length : 0;
                    r = r < 0 ? Un(0, a + r) : r || 0
                } else if (r) {
                    var i = Tt(e, t);
                    return e[i] === t ? i : -1
                }
                return n(e, t, r)
            }
            function yt(e, n, r) {
                var a = 0
                  , i = e ? e.length : 0;
                if ("number" != typeof n && null != n) {
                    var o = i;
                    for (n = t.createCallback(n, r, 3); o-- && n(e[o], o, e); )
                        a++
                } else
                    a = null == n || r ? 1 : n || a;
                return h(e, 0, Gn(Un(0, i - a), i))
            }
            function bt() {
                for (var e = [], t = -1, a = arguments.length, i = c(), o = ue(), u = o === n, l = c(); ++t < a; ) {
                    var h = arguments[t];
                    (Zn(h) || de(h)) && (e.push(h),
                    i.push(u && h.length >= _ && s(t ? e[t] : l)))
                }
                var p = e[0]
                  , m = -1
                  , g = p ? p.length : 0
                  , v = [];
                e: for (; ++m < g; ) {
                    var y = i[0];
                    if (h = p[m],
                    (y ? r(y, h) : o(l, h)) < 0) {
                        for (t = a,
                        (y || l).push(h); --t; )
                            if (y = i[t],
                            (y ? r(y, h) : o(e[t], h)) < 0)
                                continue e;
                        v.push(h)
                    }
                }
                for (; a--; )
                    y = i[a],
                    y && d(y);
                return f(i),
                f(l),
                v
            }
            function _t(e, n, r) {
                var a = 0
                  , i = e ? e.length : 0;
                if ("number" != typeof n && null != n) {
                    var o = i;
                    for (n = t.createCallback(n, r, 3); o-- && n(e[o], o, e); )
                        a++
                } else if (a = n,
                null == a || r)
                    return e ? e[i - 1] : m;
                return h(e, Un(0, i - a))
            }
            function wt(e, t, n) {
                var r = e ? e.length : 0;
                for ("number" == typeof n && (r = (n < 0 ? Un(0, r + n) : Gn(n, r - 1)) + 1); r--; )
                    if (e[r] === t)
                        return r;
                return -1
            }
            function At(e) {
                for (var t = arguments, n = 0, r = t.length, a = e ? e.length : 0; ++n < r; )
                    for (var i = -1, o = t[n]; ++i < a; )
                        e[i] === o && (Ln.call(e, i--, 1),
                        a--);
                return e
            }
            function xt(e, t, n) {
                e = +e || 0,
                n = "number" == typeof n ? n : +n || 1,
                null == t && (t = e,
                e = 0);
                for (var r = -1, a = Un(0, Cn((t - e) / (n || 1))), i = pn(a); ++r < a; )
                    i[r] = e,
                    e += n;
                return i
            }
            function Mt(e, n, r) {
                var a = -1
                  , i = e ? e.length : 0
                  , o = [];
                for (n = t.createCallback(n, r, 3); ++a < i; ) {
                    var s = e[a];
                    n(s, a, e) && (o.push(s),
                    Ln.call(e, a--, 1),
                    i--)
                }
                return o
            }
            function kt(e, n, r) {
                if ("number" != typeof n && null != n) {
                    var a = 0
                      , i = -1
                      , o = e ? e.length : 0;
                    for (n = t.createCallback(n, r, 3); ++i < o && n(e[i], i, e); )
                        a++
                } else
                    a = null == n || r ? 1 : Un(0, n);
                return h(e, a)
            }
            function Tt(e, n, r, a) {
                var i = 0
                  , o = e ? e.length : i;
                for (r = r ? t.createCallback(r, a, 1) : Jt,
                n = r(n); i < o; ) {
                    var s = i + o >>> 1;
                    r(e[s]) < n ? i = s + 1 : o = s
                }
                return i
            }
            function St() {
                return ae(Q(arguments, !0, !0))
            }
            function Et(e, n, r, a) {
                return "boolean" != typeof n && null != n && (a = r,
                r = "function" != typeof n && a && a[n] === e ? null : n,
                n = !1),
                null != r && (r = t.createCallback(r, a, 3)),
                ae(e, n, r)
            }
            function Ct(e) {
                return Z(e, h(arguments, 1))
            }
            function Ot() {
                for (var e = -1, t = arguments.length; ++e < t; ) {
                    var n = arguments[e];
                    if (Zn(n) || de(n))
                        var r = r ? ae(Z(r, n).concat(Z(n, r))) : n
                }
                return r || []
            }
            function Dt() {
                for (var e = arguments.length > 1 ? arguments : arguments[0], t = -1, n = e ? et(hr(e, "length")) : 0, r = pn(n < 0 ? 0 : n); ++t < n; )
                    r[t] = hr(e, t);
                return r
            }
            function jt(e, t) {
                var n = -1
                  , r = e ? e.length : 0
                  , a = {};
                for (t || !r || Zn(e[0]) || (t = []); ++n < r; ) {
                    var i = e[n];
                    t ? a[i] = t[n] : i && (a[i[0]] = i[1])
                }
                return a
            }
            function Pt(e, t) {
                if (!Ce(t))
                    throw new xn;
                return function() {
                    if (--e < 1)
                        return t.apply(this, arguments)
                }
            }
            function zt(e, t) {
                return arguments.length > 2 ? oe(e, 17, h(arguments, 2), null, t) : oe(e, 1, null, null, t)
            }
            function Nt(e) {
                for (var t = arguments.length > 1 ? Q(arguments, !0, !1, 1) : _e(e), n = -1, r = t.length; ++n < r; ) {
                    var a = t[n];
                    e[a] = oe(e[a], 1, null, null, e)
                }
                return e
            }
            function Wt(e, t) {
                return arguments.length > 2 ? oe(t, 19, h(arguments, 2), null, e) : oe(t, 3, null, null, e)
            }
            function Lt() {
                for (var e = arguments, t = e.length; t--; )
                    if (!Ce(e[t]))
                        throw new xn;
                return function() {
                    for (var t = arguments, n = e.length; n--; )
                        t = [e[n].apply(this, t)];
                    return t[0]
                }
            }
            function Rt(e, t) {
                return t = "number" == typeof t ? t : +t || e.length,
                oe(e, 4, null, null, null, t)
            }
            function qt(e, t, n) {
                var r, a, i, o, s, u, c, l = 0, f = !1, d = !0;
                if (!Ce(e))
                    throw new xn;
                if (t = Un(0, t) || 0,
                n === !0) {
                    var h = !0;
                    d = !1
                } else
                    Oe(n) && (h = n.leading,
                    f = "maxWait"in n && (Un(t, n.maxWait) || 0),
                    d = "trailing"in n ? n.trailing : d);
                var p = function() {
                    var n = t - (mr() - o);
                    if (n <= 0) {
                        a && On(a);
                        var f = c;
                        a = u = c = m,
                        f && (l = mr(),
                        i = e.apply(s, r),
                        u || a || (r = s = null))
                    } else
                        u = Wn(p, n)
                }
                  , g = function() {
                    u && On(u),
                    a = u = c = m,
                    (d || f !== t) && (l = mr(),
                    i = e.apply(s, r),
                    u || a || (r = s = null))
                };
                return function() {
                    if (r = arguments,
                    o = mr(),
                    s = this,
                    c = d && (u || !h),
                    f === !1)
                        var n = h && !u;
                    else {
                        a || h || (l = o);
                        var m = f - (o - l)
                          , v = m <= 0;
                        v ? (a && (a = On(a)),
                        l = o,
                        i = e.apply(s, r)) : a || (a = Wn(g, m))
                    }
                    return v && u ? u = On(u) : u || t === f || (u = Wn(p, t)),
                    n && (v = !0,
                    i = e.apply(s, r)),
                    !v || u || a || (r = s = null),
                    i
                }
            }
            function Yt(e) {
                if (!Ce(e))
                    throw new xn;
                var t = h(arguments, 1);
                return Wn(function() {
                    e.apply(m, t)
                }, 1)
            }
            function Bt(e, t) {
                if (!Ce(e))
                    throw new xn;
                var n = h(arguments, 2);
                return Wn(function() {
                    e.apply(m, n)
                }, t)
            }
            function Ht(e, t) {
                if (!Ce(e))
                    throw new xn;
                var n = function() {
                    var r = n.cache
                      , a = t ? t.apply(this, arguments) : b + arguments[0];
                    return zn.call(r, a) ? r[a] : r[a] = e.apply(this, arguments)
                };
                return n.cache = {},
                n
            }
            function Ft(e) {
                var t, n;
                if (!Ce(e))
                    throw new xn;
                return function() {
                    return t ? n : (t = !0,
                    n = e.apply(this, arguments),
                    e = null,
                    n)
                }
            }
            function It(e) {
                return oe(e, 16, h(arguments, 1))
            }
            function Ut(e) {
                return oe(e, 32, null, h(arguments, 1))
            }
            function Gt(e, t, n) {
                var r = !0
                  , a = !0;
                if (!Ce(e))
                    throw new xn;
                return n === !1 ? r = !1 : Oe(n) && (r = "leading"in n ? n.leading : r,
                a = "trailing"in n ? n.trailing : a),
                G.leading = r,
                G.maxWait = t,
                G.trailing = a,
                qt(e, t, G)
            }
            function $t(e, t) {
                return oe(t, 16, [e])
            }
            function Vt(e) {
                return function() {
                    return e
                }
            }
            function Kt(e, t, n) {
                var r = typeof e;
                if (null == e || "function" == r)
                    return K(e, t, n);
                if ("object" != r)
                    return tn(e);
                var a = er(e)
                  , i = a[0]
                  , o = e[i];
                return 1 != a.length || o !== o || Oe(o) ? function(t) {
                    for (var n = a.length, r = !1; n-- && (r = ee(t[a[n]], e[a[n]], null, !0)); )
                        ;
                    return r
                }
                : function(e) {
                    var t = e[i];
                    return o === t && (0 !== o || 1 / o == 1 / t)
                }
            }
            function Xt(e) {
                return null == e ? "" : An(e).replace(ar, se)
            }
            function Jt(e) {
                return e
            }
            function Zt(e, n, r) {
                var i = !0
                  , o = n && _e(n);
                n && (r || o.length) || (null == r && (r = n),
                s = a,
                n = e,
                e = t,
                o = _e(n)),
                r === !1 ? i = !1 : Oe(r) && "chain"in r && (i = r.chain);
                var s = e
                  , u = Ce(s);
                Xe(o, function(t) {
                    var r = e[t] = n[t];
                    u && (s.prototype[t] = function() {
                        var t = this.__chain__
                          , n = this.__wrapped__
                          , a = [n];
                        Nn.apply(a, arguments);
                        var o = r.apply(e, a);
                        if (i || t) {
                            if (n === o && Oe(o))
                                return this;
                            o = new s(o),
                            o.__chain__ = t
                        }
                        return o
                    }
                    )
                })
            }
            function Qt() {
                return e._ = Tn,
                this
            }
            function en() {}
            function tn(e) {
                return function(t) {
                    return t[e]
                }
            }
            function nn(e, t, n) {
                var r = null == e
                  , a = null == t;
                if (null == n && ("boolean" == typeof e && a ? (n = e,
                e = 1) : a || "boolean" != typeof t || (n = t,
                a = !0)),
                r && a && (t = 1),
                e = +e || 0,
                a ? (t = e,
                e = 0) : t = +t || 0,
                n || e % 1 || t % 1) {
                    var i = Vn();
                    return Gn(e + i * (t - e + parseFloat("1e-" + ((i + "").length - 1))), t)
                }
                return re(e, t)
            }
            function rn(e, t) {
                if (e) {
                    var n = e[t];
                    return Ce(n) ? e[t]() : n
                }
            }
            function an(e, n, r) {
                var a = t.templateSettings;
                e = An(e || ""),
                r = or({}, r, a);
                var i, o = or({}, r.imports, a.imports), s = er(o), c = Fe(o), l = 0, f = r.interpolate || D, d = "__p += '", h = wn((r.escape || D).source + "|" + f.source + "|" + (f === C ? T : D).source + "|" + (r.evaluate || D).source + "|$", "g");
                e.replace(h, function(t, n, r, a, o, s) {
                    return r || (r = a),
                    d += e.slice(l, s).replace(P, u),
                    n && (d += "' +\n__e(" + n + ") +\n'"),
                    o && (i = !0,
                    d += "';\n" + o + ";\n__p += '"),
                    r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                    l = s + t.length,
                    t
                }),
                d += "';\n";
                var p = r.variable
                  , g = p;
                g || (p = "obj",
                d = "with (" + p + ") {\n" + d + "\n}\n"),
                d = (i ? d.replace(x, "") : d).replace(M, "$1").replace(k, "$1;"),
                d = "function(" + p + ") {\n" + (g ? "" : p + " || (" + p + " = {});\n") + "var __t, __p = '', __e = _.escape" + (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d + "return __p\n}";
                var v = "\n/*\n//# sourceURL=" + (r.sourceURL || "/lodash/template/source[" + N++ + "]") + "\n*/";
                try {
                    var y = vn(s, "return " + d + v).apply(m, c)
                } catch (e) {
                    throw e.source = d,
                    e
                }
                return n ? y(n) : (y.source = d,
                y)
            }
            function on(e, t, n) {
                e = (e = +e) > -1 ? e : 0;
                var r = -1
                  , a = pn(e);
                for (t = K(t, n, 1); ++r < e; )
                    a[r] = t(r);
                return a
            }
            function sn(e) {
                return null == e ? "" : An(e).replace(rr, fe)
            }
            function un(e) {
                var t = ++y;
                return An(null == e ? "" : e) + t
            }
            function cn(e) {
                return e = new a(e),
                e.__chain__ = !0,
                e
            }
            function ln(e, t) {
                return t(e),
                e
            }
            function fn() {
                return this.__chain__ = !0,
                this
            }
            function dn() {
                return An(this.__wrapped__)
            }
            function hn() {
                return this.__wrapped__
            }
            e = e ? te.defaults(X.Object(), e, te.pick(X, z)) : X;
            var pn = e.Array
              , mn = e.Boolean
              , gn = e.Date
              , vn = e.Function
              , yn = e.Math
              , bn = e.Number
              , _n = e.Object
              , wn = e.RegExp
              , An = e.String
              , xn = e.TypeError
              , Mn = []
              , kn = _n.prototype
              , Tn = e._
              , Sn = kn.toString
              , En = wn("^" + An(Sn).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$")
              , Cn = yn.ceil
              , On = e.clearTimeout
              , Dn = yn.floor
              , jn = vn.prototype.toString
              , Pn = ce(Pn = _n.getPrototypeOf) && Pn
              , zn = kn.hasOwnProperty
              , Nn = Mn.push
              , Wn = e.setTimeout
              , Ln = Mn.splice
              , Rn = Mn.unshift
              , qn = function() {
                try {
                    var e = {}
                      , t = ce(t = _n.defineProperty) && t
                      , n = t(e, e, e) && t
                } catch (e) {}
                return n
            }()
              , Yn = ce(Yn = _n.create) && Yn
              , Bn = ce(Bn = pn.isArray) && Bn
              , Hn = e.isFinite
              , Fn = e.isNaN
              , In = ce(In = _n.keys) && In
              , Un = yn.max
              , Gn = yn.min
              , $n = e.parseInt
              , Vn = yn.random
              , Kn = {};
            Kn[L] = pn,
            Kn[R] = mn,
            Kn[q] = gn,
            Kn[Y] = vn,
            Kn[H] = _n,
            Kn[B] = bn,
            Kn[F] = wn,
            Kn[I] = An,
            a.prototype = t.prototype;
            var Xn = t.support = {};
            Xn.funcDecomp = !ce(e.WinRTError) && j.test(p),
            Xn.funcNames = "string" == typeof vn.name,
            t.templateSettings = {
                escape: /<%-([\s\S]+?)%>/g,
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: C,
                variable: "",
                imports: {
                    _: t
                }
            },
            Yn || (w = function() {
                function t() {}
                return function(n) {
                    if (Oe(n)) {
                        t.prototype = n;
                        var r = new t;
                        t.prototype = null
                    }
                    return r || e.Object()
                }
            }());
            var Jn = qn ? function(e, t) {
                $.value = t,
                qn(e, "__bindData__", $),
                $.value = null
            }
            : en
              , Zn = Bn || function(e) {
                return e && "object" == typeof e && "number" == typeof e.length && Sn.call(e) == L || !1
            }
              , Qn = function(e) {
                var t, n = e, r = [];
                if (!n)
                    return r;
                if (!V[typeof e])
                    return r;
                for (t in n)
                    zn.call(n, t) && r.push(t);
                return r
            }
              , er = In ? function(e) {
                return Oe(e) ? In(e) : []
            }
            : Qn
              , tr = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }
              , nr = Ae(tr)
              , rr = wn("(" + er(nr).join("|") + ")", "g")
              , ar = wn("[" + er(tr).join("") + "]", "g")
              , ir = function(e, t, n) {
                var r, a = e, i = a;
                if (!a)
                    return i;
                var o = arguments
                  , s = 0
                  , u = "number" == typeof n ? 2 : o.length;
                if (u > 3 && "function" == typeof o[u - 2])
                    var c = K(o[--u - 1], o[u--], 2);
                else
                    u > 2 && "function" == typeof o[u - 1] && (c = o[--u]);
                for (; ++s < u; )
                    if (a = o[s],
                    a && V[typeof a])
                        for (var l = -1, f = V[typeof a] && er(a), d = f ? f.length : 0; ++l < d; )
                            r = f[l],
                            i[r] = c ? c(i[r], a[r]) : a[r];
                return i
            }
              , or = function(e, t, n) {
                var r, a = e, i = a;
                if (!a)
                    return i;
                for (var o = arguments, s = 0, u = "number" == typeof n ? 2 : o.length; ++s < u; )
                    if (a = o[s],
                    a && V[typeof a])
                        for (var c = -1, l = V[typeof a] && er(a), f = l ? l.length : 0; ++c < f; )
                            r = l[c],
                            "undefined" == typeof i[r] && (i[r] = a[r]);
                return i
            }
              , sr = function(e, t, n) {
                var r, a = e, i = a;
                if (!a)
                    return i;
                if (!V[typeof a])
                    return i;
                t = t && "undefined" == typeof n ? t : K(t, n, 3);
                for (r in a)
                    if (t(a[r], r, e) === !1)
                        return i;
                return i
            }
              , ur = function(e, t, n) {
                var r, a = e, i = a;
                if (!a)
                    return i;
                if (!V[typeof a])
                    return i;
                t = t && "undefined" == typeof n ? t : K(t, n, 3);
                for (var o = -1, s = V[typeof a] && er(a), u = s ? s.length : 0; ++o < u; )
                    if (r = s[o],
                    t(a[r], r, e) === !1)
                        return i;
                return i
            }
              , cr = Pn ? function(e) {
                if (!e || Sn.call(e) != H)
                    return !1;
                var t = e.valueOf
                  , n = ce(t) && (n = Pn(t)) && Pn(n);
                return n ? e == n || Pn(e) == n : le(e)
            }
            : le
              , lr = ie(function(e, t, n) {
                zn.call(e, n) ? e[n]++ : e[n] = 1
            })
              , fr = ie(function(e, t, n) {
                (zn.call(e, n) ? e[n] : e[n] = []).push(t)
            })
              , dr = ie(function(e, t, n) {
                e[n] = t
            })
              , hr = Qe
              , pr = $e
              , mr = ce(mr = gn.now) && mr || function() {
                return (new gn).getTime()
            }
              , gr = 8 == $n(A + "08") ? $n : function(e, t) {
                return $n(Ne(e) ? e.replace(O, "") : e, t || 0)
            }
            ;
            return t.after = Pt,
            t.assign = ir,
            t.at = Ie,
            t.bind = zt,
            t.bindAll = Nt,
            t.bindKey = Wt,
            t.chain = cn,
            t.compact = ft,
            t.compose = Lt,
            t.constant = Vt,
            t.countBy = lr,
            t.create = me,
            t.createCallback = Kt,
            t.curry = Rt,
            t.debounce = qt,
            t.defaults = or,
            t.defer = Yt,
            t.delay = Bt,
            t.difference = dt,
            t.filter = $e,
            t.flatten = gt,
            t.forEach = Xe,
            t.forEachRight = Je,
            t.forIn = sr,
            t.forInRight = ye,
            t.forOwn = ur,
            t.forOwnRight = be,
            t.functions = _e,
            t.groupBy = fr,
            t.indexBy = dr,
            t.initial = yt,
            t.intersection = bt,
            t.invert = Ae,
            t.invoke = Ze,
            t.keys = er,
            t.map = Qe,
            t.mapValues = Le,
            t.max = et,
            t.memoize = Ht,
            t.merge = Re,
            t.min = tt,
            t.omit = qe,
            t.once = Ft,
            t.pairs = Ye,
            t.partial = It,
            t.partialRight = Ut,
            t.pick = Be,
            t.pluck = hr,
            t.property = tn,
            t.pull = At,
            t.range = xt,
            t.reject = at,
            t.remove = Mt,
            t.rest = kt,
            t.shuffle = ot,
            t.sortBy = ct,
            t.tap = ln,
            t.throttle = Gt,
            t.times = on,
            t.toArray = lt,
            t.transform = He,
            t.union = St,
            t.uniq = Et,
            t.values = Fe,
            t.where = pr,
            t.without = Ct,
            t.wrap = $t,
            t.xor = Ot,
            t.zip = Dt,
            t.zipObject = jt,
            t.collect = Qe,
            t.drop = kt,
            t.each = Xe,
            t.eachRight = Je,
            t.extend = ir,
            t.methods = _e,
            t.object = jt,
            t.select = $e,
            t.tail = kt,
            t.unique = Et,
            t.unzip = Dt,
            Zt(t),
            t.clone = he,
            t.cloneDeep = pe,
            t.contains = Ue,
            t.escape = Xt,
            t.every = Ge,
            t.find = Ve,
            t.findIndex = ht,
            t.findKey = ge,
            t.findLast = Ke,
            t.findLastIndex = pt,
            t.findLastKey = ve,
            t.has = we,
            t.identity = Jt,
            t.indexOf = vt,
            t.isArguments = de,
            t.isArray = Zn,
            t.isBoolean = xe,
            t.isDate = Me,
            t.isElement = ke,
            t.isEmpty = Te,
            t.isEqual = Se,
            t.isFinite = Ee,
            t.isFunction = Ce,
            t.isNaN = De,
            t.isNull = je,
            t.isNumber = Pe,
            t.isObject = Oe,
            t.isPlainObject = cr,
            t.isRegExp = ze,
            t.isString = Ne,
            t.isUndefined = We,
            t.lastIndexOf = wt,
            t.mixin = Zt,
            t.noConflict = Qt,
            t.noop = en,
            t.now = mr,
            t.parseInt = gr,
            t.random = nn,
            t.reduce = nt,
            t.reduceRight = rt,
            t.result = rn,
            t.runInContext = p,
            t.size = st,
            t.some = ut,
            t.sortedIndex = Tt,
            t.template = an,
            t.unescape = sn,
            t.uniqueId = un,
            t.all = Ge,
            t.any = ut,
            t.detect = Ve,
            t.findWhere = Ve,
            t.foldl = nt,
            t.foldr = rt,
            t.include = Ue,
            t.inject = nt,
            Zt(function() {
                var e = {};
                return ur(t, function(n, r) {
                    t.prototype[r] || (e[r] = n)
                }),
                e
            }(), !1),
            t.first = mt,
            t.last = _t,
            t.sample = it,
            t.take = mt,
            t.head = mt,
            ur(t, function(e, n) {
                var r = "sample" !== n;
                t.prototype[n] || (t.prototype[n] = function(t, n) {
                    var i = this.__chain__
                      , o = e(this.__wrapped__, t, n);
                    return i || null != t && (!n || r && "function" == typeof t) ? new a(o,i) : o
                }
                )
            }),
            t.VERSION = "2.4.2",
            t.prototype.chain = fn,
            t.prototype.toString = dn,
            t.prototype.value = hn,
            t.prototype.valueOf = hn,
            Xe(["join", "pop", "shift"], function(e) {
                var n = Mn[e];
                t.prototype[e] = function() {
                    var e = this.__chain__
                      , t = n.apply(this.__wrapped__, arguments);
                    return e ? new a(t,e) : t
                }
            }),
            Xe(["push", "reverse", "sort", "unshift"], function(e) {
                var n = Mn[e];
                t.prototype[e] = function() {
                    return n.apply(this.__wrapped__, arguments),
                    this
                }
            }),
            Xe(["concat", "slice", "splice"], function(e) {
                var n = Mn[e];
                t.prototype[e] = function() {
                    return new a(n.apply(this.__wrapped__, arguments),this.__chain__)
                }
            }),
            t
        }
        var m, g = [], v = [], y = 0, b = +new Date + "", _ = 75, w = 40, A = " \t\v\f \ufeff\n\r\u2028\u2029 ᠎             　", x = /\b__p \+= '';/g, M = /\b(__p \+=) '' \+/g, k = /(__e\(.*?\)|\b__t\)) \+\n'';/g, T = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, S = /\w*$/, E = /^\s*function[ \n\r\t]+\w/, C = /<%=([\s\S]+?)%>/g, O = RegExp("^[" + A + "]*0+(?=.$)"), D = /($^)/, j = /\bthis\b/, P = /['\n\r\t\u2028\u2029\\]/g, z = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"], N = 0, W = "[object Arguments]", L = "[object Array]", R = "[object Boolean]", q = "[object Date]", Y = "[object Function]", B = "[object Number]", H = "[object Object]", F = "[object RegExp]", I = "[object String]", U = {};
        U[Y] = !1,
        U[W] = U[L] = U[R] = U[q] = U[B] = U[H] = U[F] = U[I] = !0;
        var G = {
            leading: !1,
            maxWait: 0,
            trailing: !1
        }
          , $ = {
            configurable: !1,
            enumerable: !1,
            value: null,
            writable: !1
        }
          , V = {
            boolean: !1,
            function: !0,
            object: !0,
            number: !1,
            string: !1,
            undefined: !1
        }
          , K = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\t": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , X = V[typeof window] && window || this
          , J = V[typeof t] && t && !t.nodeType && t
          , Z = V[typeof e] && e && !e.nodeType && e
          , Q = Z && Z.exports === J && J
          , ee = V[typeof Gt] && Gt;
        !ee || ee.global !== ee && ee.window !== ee || (X = ee);
        var te = p();
        "function" == typeof define && "object" == typeof define.amd && define.amd ? (X._ = te,
        define(function() {
            return te
        })) : J && Z ? Q ? (Z.exports = te)._ = te : J._ = te : X._ = te
    }
    ).call(this)
})
  , hm = dm
  , pm = function(e, t, n) {
    e = ct(e),
    t = ct(t);
    var r, a;
    e.length > t.length ? (r = e,
    a = t) : (r = t,
    a = e);
    var i, o, s, u, c = n ? n : .7, l = .1, f = Math.floor(Math.max(r.length / 2 - 1, 0)), d = [], h = [], p = 0;
    for (i = 0; i < a.length; i++)
        for (u = a[i],
        o = Math.max(i - f, 0),
        s = Math.min(i + f + 1, r.length); o < s; o++)
            if (!h[o] && u === r[o]) {
                d[i] = o,
                h[o] = !0,
                p++;
                break
            }
    var m, g, v = [], y = [], b = 0, _ = 0;
    for (m = 0,
    g = 0; m < a.length; m++)
        d[m] > -1 && (v[g] = a[m],
        g++);
    for (m = 0,
    g = 0; m < r.length; m++)
        h[m] && (y[g] = r[m],
        g++);
    for (i = 0; i < v.length; i++)
        v[i] !== y[i] && b++;
    for (i = 0; i < a.length && e[i] === t[i]; i++)
        _++;
    var w = p
      , n = b / 2;
    if (w) {
        var A = (w / e.length + w / t.length + (w - n) / w) / 3
          , x = A < c ? A : A + Math.min(l, 1 / r.length) * _ * (1 - A);
        return x
    }
    return 0
}
  , mm = function(e, t, n) {
    if (e = ct(e),
    t = ct(t),
    0 === e.length)
        return t.length;
    if (0 === t.length)
        return e.length;
    var r, a, i, o, s = n ? n : {
        d: 1,
        i: 1,
        s: 1
    }, u = [], c = [], l = t.length + 1;
    for (r = 0; r < l; r++)
        u[r] = r;
    for (r = 0; r < e.length; r++) {
        for (c[0] = r + 1,
        a = 0; a < t.length; a++)
            i = e[r] === t[a] ? 0 : s.s,
            c[a + 1] = Math.min(c[a] + s.d, u[a + 1] + s.i, u[a] + i);
        for (a = 0; a < l; a++)
            u[a] = c[a]
    }
    return o = Math.max(e.length, t.length),
    (o - c[t.length]) / o
}
  , gm = function(e, t, n) {
    e = ct(e),
    t = ct(t);
    var r, a, i, o, s, u, c, l = e.length, f = t.length, d = n ? n : 2, h = [], p = [], m = [], g = [], v = [];
    if (0 === l || 0 === f)
        return l === f ? 1 : 0;
    if (r = 0,
    l < d || f < d) {
        for (a = 0,
        o = Math.min(l, f); a < o; a++)
            e[a] === t[a] && r++;
        return r / Math.max(l, f)
    }
    for (a = 0; a < l + d - 1; a++)
        a < d - 1 ? h[a] = 0 : h[a] = e[a - d + 1];
    for (a = 0; a <= l; a++)
        p[a] = a;
    for (i = 1; i <= f; i++) {
        if (i < d) {
            for (s = 0; s < d - i; s++)
                v[s] = 0;
            for (s = d - i; s < d; s++)
                v[s] = t[s - (d - i)]
        } else
            v = t.slice(i - d, i);
        for (m[0] = i,
        a = 1; a <= l; a++) {
            for (r = 0,
            u = d,
            o = 0; o < d; o++)
                h[a - 1 + o] !== v[o] ? r++ : 0 === h[a - 1 + o] && u--;
            c = r / u,
            m[a] = Math.min(Math.min(m[a - 1] + 1, p[a] + 1), p[a - 1] + c)
        }
        g = p,
        p = m,
        m = g
    }
    return 1 - p[l] / Math.max(l, f)
}
  , vm = function(e, t) {
    var n = [];
    Object.keys(e).forEach(function(e) {
        t[e] && n.push(e)
    });
    var r = n.length;
    if (0 === r)
        return 0;
    var a = ut(n.map(function(t) {
        return e[t]
    }))
      , i = ut(n.map(function(e) {
        return t[e]
    }))
      , o = ut(n.map(function(t) {
        return Math.pow(e[t], 2)
    }))
      , s = ut(n.map(function(e) {
        return Math.pow(t[e], 2)
    }))
      , u = ut(n.map(function(n) {
        return e[n] * t[n]
    }))
      , c = u - a * i / r
      , l = Math.sqrt((o - Math.pow(a, 2) / r) * (s - Math.pow(i, 2) / r));
    return 0 === l ? 0 : c / l
}
  , ym = function(e, t) {
    return e = ct(e),
    t = ct(t),
    hm.intersection(e, t).length / hm.union(e, t).length
}
  , bm = function(e, t) {
    e = ct(e),
    t = ct(t);
    var n = hm.intersection(e, t).length;
    return n / (e.length + t.length - n)
}
  , _m = {
    jarowinkler: pm,
    levenshtein: mm,
    ngram: gm,
    pearson: vm,
    jaccard: ym,
    tanimoto: bm
}
  , wm = {
    author: Ze,
    lead_image_url: Qe,
    dek: et,
    date_published: it,
    content: ot,
    title: st
}
  , Am = {
    defaultOpts: {
        stripUnlikelyCandidates: !0,
        weightNodes: !0,
        cleanConditionally: !0
    },
    extract: function(e, t) {
        var n = e.$
          , r = e.html
          , a = e.title
          , i = e.url;
        t = da({}, this.defaultOpts, t),
        n = n || Is.load(r);
        var o = this.getContentNode(n, a, i, t);
        if (He(o))
            return this.cleanAndReturnNode(o, n);
        var s = !0
          , u = !1
          , c = void 0;
        try {
            for (var l, f = du(Vu(t).filter(function(e) {
                return t[e] === !0
            })); !(s = (l = f.next()).done); s = !0) {
                var d = l.value;
                if (t[d] = !1,
                n = Is.load(r),
                o = this.getContentNode(n, a, i, t),
                He(o))
                    break
            }
        } catch (e) {
            u = !0,
            c = e
        } finally {
            try {
                !s && f.return && f.return()
            } finally {
                if (u)
                    throw c
            }
        }
        return this.cleanAndReturnNode(o, n)
    },
    getContentNode: function(e, t, n, r) {
        return ot(ht(e, r), {
            $: e,
            cleanConditionally: r.cleanConditionally,
            title: t,
            url: n
        })
    },
    cleanAndReturnNode: function(e, t) {
        return e ? M(t.html(e)) : null
    }
}
  , xm = ["tweetmeme-title", "dc.title", "rbtitle", "headline", "title"]
  , Mm = ["og:title"]
  , km = [".hentry .entry-title", "h1#articleHeader", "h1.articleHeader", "h1.article", ".instapaper_title", "#meebo-title"]
  , Tm = ["article h1", "#entry-title", ".entry-title", "#entryTitle", "#entrytitle", ".entryTitle", ".entrytitle", "#articleTitle", ".articleTitle", "post post-title", "h1.title", "h2.article", "h1", "html head title", "title"]
  , Sm = {
    extract: function(e) {
        var t = e.$
          , n = e.url
          , r = e.metaCache
          , a = void 0;
        return (a = Le(t, xm, r)) ? st(a, {
            url: n,
            $: t
        }) : (a = qe(t, km)) ? st(a, {
            url: n,
            $: t
        }) : (a = Le(t, Mm, r)) ? st(a, {
            url: n,
            $: t
        }) : (a = qe(t, Tm),
        a ? st(a, {
            url: n,
            $: t
        }) : "")
    }
}
  , Em = ["byl", "clmst", "dc.author", "dcsext.author", "dc.creator", "rbauthors", "authors"]
  , Cm = 300
  , Om = [".entry .entry-author", ".author.vcard .fn", ".author .vcard .fn", ".byline.vcard .fn", ".byline .vcard .fn", ".byline .by .author", ".byline .by", ".byline .author", ".post-author.vcard", ".post-author .vcard", "a[rel=author]", "#by_author", ".by_author", "#entryAuthor", ".entryAuthor", ".byline a[href*=author]", "#author .authorname", ".author .authorname", "#author", ".author", ".articleauthor", ".ArticleAuthor", ".byline"]
  , Dm = /^[\n\s]*By/i
  , jm = [["#byline", Dm], [".byline", Dm]]
  , Pm = {
    extract: function(e) {
        var t = e.$
          , n = e.metaCache
          , r = void 0;
        if (r = Le(t, Em, n),
        r && r.length < Cm)
            return Ze(r);
        if (r = qe(t, Om, 2),
        r && r.length < Cm)
            return Ze(r);
        var a = !0
          , i = !1
          , o = void 0;
        try {
            for (var s, u = du(jm); !(a = (s = u.next()).done); a = !0) {
                var c = s.value
                  , l = pu(c, 2)
                  , f = l[0]
                  , d = l[1]
                  , h = t(f);
                if (1 === h.length) {
                    var p = h.text();
                    if (d.test(p))
                        return Ze(p)
                }
            }
        } catch (e) {
            i = !0,
            o = e
        } finally {
            try {
                !a && u.return && u.return()
            } finally {
                if (i)
                    throw o
            }
        }
        return null
    }
}
  , zm = ["article:published_time", "displaydate", "dc.date", "dc.date.issued", "rbpubdate", "publish_date", "pub_date", "pagedate", "pubdate", "revision_date", "doc_date", "date_created", "content_create_date", "lastmodified", "created", "date"]
  , Nm = [".hentry .dtstamp.published", ".hentry .published", ".hentry .dtstamp.updated", ".hentry .updated", ".single .published", ".meta .published", ".meta .postDate", ".entry-date", ".byline .date", ".postmetadata .date", ".article_datetime", ".date-header", ".story-date", ".dateStamp", "#story .datetime", ".dateline", ".pubdate"]
  , Wm = "(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)"
  , Lm = [new RegExp("/(20\\d{2}/\\d{2}/\\d{2})/","i"), new RegExp("(20\\d{2}-[01]\\d-[0-3]\\d)","i"), new RegExp("/(20\\d{2}/" + Wm + "/[0-3]\\d)/","i")]
  , Rm = {
    extract: function(e) {
        var t = e.$
          , n = e.url
          , r = e.metaCache
          , a = void 0;
        return (a = Le(t, zm, r, !1)) ? it(a) : (a = qe(t, Nm)) ? it(a) : (a = k(n, Lm),
        a ? it(a) : null)
    }
}
  , qm = {
    extract: function() {
        return null
    }
}
  , Ym = ["og:image", "twitter:image", "image_src"]
  , Bm = ["link[rel=image_src]"]
  , Hm = ["upload", "wp-content", "large", "photo", "wp-image"]
  , Fm = new RegExp(Hm.join("|"),"i")
  , Im = ["spacer", "sprite", "blank", "throbber", "gradient", "tile", "bg", "background", "icon", "social", "header", "hdr", "advert", "spinner", "loader", "loading", "default", "rating", "share", "facebook", "twitter", "theme", "promo", "ads", "wp-includes"]
  , Um = new RegExp(Im.join("|"),"i")
  , Gm = /\.gif(\?.*)?$/i
  , $m = /\.jpe?g(\?.*)?$/i
  , Vm = {
    extract: function(e) {
        var t = e.$
          , n = e.content
          , r = e.metaCache
          , a = e.html
          , i = void 0;
        t.browser || 0 !== t("head").length || t("*").first().prepend(a);
        var o = Le(t, Ym, r, !1);
        if (o && (i = Qe(o)))
            return i;
        var s = t(n)
          , u = t("img", s).toArray()
          , c = {};
        u.forEach(function(e, n) {
            var r = t(e)
              , a = r.attr("src");
            if (a) {
                var i = mt(a);
                i += gt(r),
                i += vt(r),
                i += yt(r),
                i += bt(r),
                i += _t(u, n),
                c[a] = i
            }
        });
        var l = Vu(c).reduce(function(e, t) {
            return c[t] > e[1] ? [t, c[t]] : e
        }, [null, 0])
          , f = pu(l, 2)
          , d = f[0]
          , h = f[1];
        if (h > 0 && (i = Qe(d)))
            return i;
        var p = !0
          , m = !1
          , g = void 0;
        try {
            for (var v, y = du(Bm); !(p = (v = y.next()).done); p = !0) {
                var b = v.value
                  , _ = t(b).first()
                  , w = _.attr("src");
                if (w && (i = Qe(w)))
                    return i;
                var A = _.attr("href");
                if (A && (i = Qe(A)))
                    return i;
                var x = _.attr("value");
                if (x && (i = Qe(x)))
                    return i
            }
        } catch (e) {
            m = !0,
            g = e
        } finally {
            try {
                !p && y.return && y.return()
            } finally {
                if (m)
                    throw g
            }
        }
        return null
    }
}
  , Km = n(function(e, t) {
    (function() {
        var n, r, a, i, o, s, u, c, l, f, d, h, p, m, g;
        a = Math.floor,
        f = Math.min,
        r = function(e, t) {
            return e < t ? -1 : e > t ? 1 : 0
        }
        ,
        l = function(e, t, n, i, o) {
            var s;
            if (null == n && (n = 0),
            null == o && (o = r),
            n < 0)
                throw new Error("lo must be non-negative");
            for (null == i && (i = e.length); n < i; )
                s = a((n + i) / 2),
                o(t, e[s]) < 0 ? i = s : n = s + 1;
            return [].splice.apply(e, [n, n - n].concat(t)),
            t
        }
        ,
        s = function(e, t, n) {
            return null == n && (n = r),
            e.push(t),
            m(e, 0, e.length - 1, n)
        }
        ,
        o = function(e, t) {
            var n, a;
            return null == t && (t = r),
            n = e.pop(),
            e.length ? (a = e[0],
            e[0] = n,
            g(e, 0, t)) : a = n,
            a
        }
        ,
        c = function(e, t, n) {
            var a;
            return null == n && (n = r),
            a = e[0],
            e[0] = t,
            g(e, 0, n),
            a
        }
        ,
        u = function(e, t, n) {
            var a;
            return null == n && (n = r),
            e.length && n(e[0], t) < 0 && (a = [e[0], t],
            t = a[0],
            e[0] = a[1],
            g(e, 0, n)),
            t
        }
        ,
        i = function(e, t) {
            var n, i, o, s, u, c;
            for (null == t && (t = r),
            s = function() {
                c = [];
                for (var t = 0, n = a(e.length / 2); 0 <= n ? t < n : t > n; 0 <= n ? t++ : t--)
                    c.push(t);
                return c
            }
            .apply(this).reverse(),
            u = [],
            i = 0,
            o = s.length; i < o; i++)
                n = s[i],
                u.push(g(e, n, t));
            return u
        }
        ,
        p = function(e, t, n) {
            var a;
            if (null == n && (n = r),
            a = e.indexOf(t),
            a !== -1)
                return m(e, 0, a, n),
                g(e, a, n)
        }
        ,
        d = function(e, t, n) {
            var a, o, s, c, l;
            if (null == n && (n = r),
            o = e.slice(0, t),
            !o.length)
                return o;
            for (i(o, n),
            l = e.slice(t),
            s = 0,
            c = l.length; s < c; s++)
                a = l[s],
                u(o, a, n);
            return o.sort(n).reverse()
        }
        ,
        h = function(e, t, n) {
            var a, s, u, c, d, h, p, m, g, v;
            if (null == n && (n = r),
            10 * t <= e.length) {
                if (c = e.slice(0, t).sort(n),
                !c.length)
                    return c;
                for (u = c[c.length - 1],
                m = e.slice(t),
                d = 0,
                p = m.length; d < p; d++)
                    a = m[d],
                    n(a, u) < 0 && (l(c, a, 0, null, n),
                    c.pop(),
                    u = c[c.length - 1]);
                return c
            }
            for (i(e, n),
            v = [],
            s = h = 0,
            g = f(t, e.length); 0 <= g ? h < g : h > g; s = 0 <= g ? ++h : --h)
                v.push(o(e, n));
            return v
        }
        ,
        m = function(e, t, n, a) {
            var i, o, s;
            for (null == a && (a = r),
            i = e[n]; n > t && (s = n - 1 >> 1,
            o = e[s],
            a(i, o) < 0); )
                e[n] = o,
                n = s;
            return e[n] = i
        }
        ,
        g = function(e, t, n) {
            var a, i, o, s, u;
            for (null == n && (n = r),
            i = e.length,
            u = t,
            o = e[t],
            a = 2 * t + 1; a < i; )
                s = a + 1,
                s < i && !(n(e[a], e[s]) < 0) && (a = s),
                e[t] = e[a],
                t = a,
                a = 2 * t + 1;
            return e[t] = o,
            m(e, u, t, n)
        }
        ,
        n = function() {
            function e(e) {
                this.cmp = null != e ? e : r,
                this.nodes = []
            }
            return e.push = s,
            e.pop = o,
            e.replace = c,
            e.pushpop = u,
            e.heapify = i,
            e.updateItem = p,
            e.nlargest = d,
            e.nsmallest = h,
            e.prototype.push = function(e) {
                return s(this.nodes, e, this.cmp)
            }
            ,
            e.prototype.pop = function() {
                return o(this.nodes, this.cmp)
            }
            ,
            e.prototype.peek = function() {
                return this.nodes[0]
            }
            ,
            e.prototype.contains = function(e) {
                return this.nodes.indexOf(e) !== -1
            }
            ,
            e.prototype.replace = function(e) {
                return c(this.nodes, e, this.cmp)
            }
            ,
            e.prototype.pushpop = function(e) {
                return u(this.nodes, e, this.cmp)
            }
            ,
            e.prototype.heapify = function() {
                return i(this.nodes, this.cmp)
            }
            ,
            e.prototype.updateItem = function(e) {
                return p(this.nodes, e, this.cmp)
            }
            ,
            e.prototype.clear = function() {
                return this.nodes = []
            }
            ,
            e.prototype.empty = function() {
                return 0 === this.nodes.length
            }
            ,
            e.prototype.size = function() {
                return this.nodes.length
            }
            ,
            e.prototype.clone = function() {
                var t;
                return t = new e,
                t.nodes = this.nodes.slice(0),
                t
            }
            ,
            e.prototype.toArray = function() {
                return this.nodes.slice(0)
            }
            ,
            e.prototype.insert = e.prototype.push,
            e.prototype.top = e.prototype.peek,
            e.prototype.front = e.prototype.peek,
            e.prototype.has = e.prototype.contains,
            e.prototype.copy = e.prototype.clone,
            e
        }(),
        function(n, r) {
            return "function" == typeof define && define.amd ? define([], r) : "object" == typeof t ? e.exports = r() : n.Heap = r()
        }(this, function() {
            return n
        })
    }
    ).call(this)
})
  , Xm = Km
  , Jm = n(function(e, t) {
    (function() {
        var e, n, r, a, i, o, s, u, c, l, f, d, h, p, m, g, v, y, b, _, w = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e)
                    return t;
            return -1
        }
        ;
        s = Math.floor,
        c = Math.max,
        l = Math.min,
        n = Xm,
        g = function(e, t) {
            return t ? 2 * e / t : 1
        }
        ,
        m = function(e, t) {
            var n, r, a, i, o, s;
            for (o = [e.length, t.length],
            r = o[0],
            a = o[1],
            n = i = 0,
            s = l(r, a); 0 <= s ? i < s : i > s; n = 0 <= s ? ++i : --i) {
                if (e[n] < t[n])
                    return -1;
                if (e[n] > t[n])
                    return 1
            }
            return r - a
        }
        ,
        _ = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        p = function(e) {
            var t, n, r;
            for (n = 0,
            r = e.length; n < r; n++)
                if (t = e[n])
                    return !0;
            return !1
        }
        ,
        i = function() {
            function e(e, t, n, r) {
                this.isjunk = e,
                null == t && (t = ""),
                null == n && (n = ""),
                this.autojunk = null == r || r,
                this.a = this.b = null,
                this.setSeqs(t, n)
            }
            return e.prototype.setSeqs = function(e, t) {
                return this.setSeq1(e),
                this.setSeq2(t)
            }
            ,
            e.prototype.setSeq1 = function(e) {
                if (e !== this.a)
                    return this.a = e,
                    this.matchingBlocks = this.opcodes = null
            }
            ,
            e.prototype.setSeq2 = function(e) {
                if (e !== this.b)
                    return this.b = e,
                    this.matchingBlocks = this.opcodes = null,
                    this.fullbcount = null,
                    this._chainB()
            }
            ,
            e.prototype._chainB = function() {
                var e, t, n, r, a, i, o, u, c, l, f, d, h, p, m, g;
                for (e = this.b,
                this.b2j = t = {},
                r = d = 0,
                p = e.length; d < p; r = ++d)
                    n = e[r],
                    i = _(t, n) ? t[n] : t[n] = [],
                    i.push(r);
                if (u = {},
                o = this.isjunk)
                    for (g = Object.keys(t),
                    h = 0,
                    m = g.length; h < m; h++)
                        n = g[h],
                        o(n) && (u[n] = !0,
                        delete t[n]);
                if (f = {},
                c = e.length,
                this.autojunk && c >= 200) {
                    l = s(c / 100) + 1;
                    for (n in t)
                        a = t[n],
                        a.length > l && (f[n] = !0,
                        delete t[n])
                }
                return this.isbjunk = function(e) {
                    return _(u, e)
                }
                ,
                this.isbpopular = function(e) {
                    return _(f, e)
                }
            }
            ,
            e.prototype.findLongestMatch = function(e, t, n, r) {
                var a, i, o, s, u, c, l, f, d, h, p, m, g, v, y, b, w, A, x, M, k;
                for (b = [this.a, this.b, this.b2j, this.isbjunk],
                a = b[0],
                i = b[1],
                o = b[2],
                f = b[3],
                w = [e, n, 0],
                s = w[0],
                u = w[1],
                c = w[2],
                h = {},
                l = g = e; e <= t ? g < t : g > t; l = e <= t ? ++g : --g) {
                    for (m = {},
                    A = _(o, a[l]) ? o[a[l]] : [],
                    v = 0,
                    y = A.length; v < y; v++)
                        if (d = A[v],
                        !(d < n)) {
                            if (d >= r)
                                break;
                            p = m[d] = (h[d - 1] || 0) + 1,
                            p > c && (x = [l - p + 1, d - p + 1, p],
                            s = x[0],
                            u = x[1],
                            c = x[2])
                        }
                    h = m
                }
                for (; s > e && u > n && !f(i[u - 1]) && a[s - 1] === i[u - 1]; )
                    M = [s - 1, u - 1, c + 1],
                    s = M[0],
                    u = M[1],
                    c = M[2];
                for (; s + c < t && u + c < r && !f(i[u + c]) && a[s + c] === i[u + c]; )
                    c++;
                for (; s > e && u > n && f(i[u - 1]) && a[s - 1] === i[u - 1]; )
                    k = [s - 1, u - 1, c + 1],
                    s = k[0],
                    u = k[1],
                    c = k[2];
                for (; s + c < t && u + c < r && f(i[u + c]) && a[s + c] === i[u + c]; )
                    c++;
                return [s, u, c]
            }
            ,
            e.prototype.getMatchingBlocks = function() {
                var e, t, n, r, a, i, o, s, u, c, l, f, d, h, p, g, v, y, b, _, w, A, x, M, k, T;
                if (this.matchingBlocks)
                    return this.matchingBlocks;
                for (A = [this.a.length, this.b.length],
                h = A[0],
                p = A[1],
                y = [[0, h, 0, p]],
                g = []; y.length; )
                    x = y.pop(),
                    t = x[0],
                    e = x[1],
                    r = x[2],
                    n = x[3],
                    M = b = this.findLongestMatch(t, e, r, n),
                    a = M[0],
                    s = M[1],
                    l = M[2],
                    l && (g.push(b),
                    t < a && r < s && y.push([t, a, r, s]),
                    a + l < e && s + l < n && y.push([a + l, e, s + l, n]));
                for (g.sort(m),
                i = u = f = 0,
                v = [],
                _ = 0,
                w = g.length; _ < w; _++)
                    k = g[_],
                    o = k[0],
                    c = k[1],
                    d = k[2],
                    i + f === o && u + f === c ? f += d : (f && v.push([i, u, f]),
                    T = [o, c, d],
                    i = T[0],
                    u = T[1],
                    f = T[2]);
                return f && v.push([i, u, f]),
                v.push([h, p, 0]),
                this.matchingBlocks = v
            }
            ,
            e.prototype.getOpcodes = function() {
                var e, t, n, r, a, i, o, s, u, c, l, f;
                if (this.opcodes)
                    return this.opcodes;
                for (r = a = 0,
                this.opcodes = t = [],
                c = this.getMatchingBlocks(),
                s = 0,
                u = c.length; s < u; s++)
                    l = c[s],
                    e = l[0],
                    n = l[1],
                    i = l[2],
                    o = "",
                    r < e && a < n ? o = "replace" : r < e ? o = "delete" : a < n && (o = "insert"),
                    o && t.push([o, r, e, a, n]),
                    f = [e + i, n + i],
                    r = f[0],
                    a = f[1],
                    i && t.push(["equal", e, r, n, a]);
                return t
            }
            ,
            e.prototype.getGroupedOpcodes = function(e) {
                var t, n, r, a, i, o, s, u, f, d, h, p, m, g, v;
                for (null == e && (e = 3),
                t = this.getOpcodes(),
                t.length || (t = [["equal", 0, 1, 0, 1]]),
                "equal" === t[0][0] && (p = t[0],
                f = p[0],
                a = p[1],
                i = p[2],
                o = p[3],
                s = p[4],
                t[0] = [f, c(a, i - e), i, c(o, s - e), s]),
                "equal" === t[t.length - 1][0] && (m = t[t.length - 1],
                f = m[0],
                a = m[1],
                i = m[2],
                o = m[3],
                s = m[4],
                t[t.length - 1] = [f, a, l(i, a + e), o, l(s, o + e)]),
                u = e + e,
                r = [],
                n = [],
                d = 0,
                h = t.length; d < h; d++)
                    g = t[d],
                    f = g[0],
                    a = g[1],
                    i = g[2],
                    o = g[3],
                    s = g[4],
                    "equal" === f && i - a > u && (n.push([f, a, l(i, a + e), o, l(s, o + e)]),
                    r.push(n),
                    n = [],
                    v = [c(a, i - e), c(o, s - e)],
                    a = v[0],
                    o = v[1]),
                    n.push([f, a, i, o, s]);
                return !n.length || 1 === n.length && "equal" === n[0][0] || r.push(n),
                r
            }
            ,
            e.prototype.ratio = function() {
                var e, t, n, r, a;
                for (t = 0,
                a = this.getMatchingBlocks(),
                n = 0,
                r = a.length; n < r; n++)
                    e = a[n],
                    t += e[2];
                return g(t, this.a.length + this.b.length)
            }
            ,
            e.prototype.quickRatio = function() {
                var e, t, n, r, a, i, o, s, u, c, l;
                if (!this.fullbcount)
                    for (this.fullbcount = n = {},
                    c = this.b,
                    i = 0,
                    s = c.length; i < s; i++)
                        t = c[i],
                        n[t] = (n[t] || 0) + 1;
                for (n = this.fullbcount,
                e = {},
                r = 0,
                l = this.a,
                o = 0,
                u = l.length; o < u; o++)
                    t = l[o],
                    a = _(e, t) ? e[t] : n[t] || 0,
                    e[t] = a - 1,
                    a > 0 && r++;
                return g(r, this.a.length + this.b.length)
            }
            ,
            e.prototype.realQuickRatio = function() {
                var e, t, n;
                return n = [this.a.length, this.b.length],
                e = n[0],
                t = n[1],
                g(l(e, t), e + t)
            }
            ,
            e
        }(),
        u = function(e, t, r, a) {
            var o, s, u, c, l, f, d, h, p, g;
            if (null == r && (r = 3),
            null == a && (a = .6),
            !(r > 0))
                throw new Error("n must be > 0: (" + r + ")");
            if (!(0 <= a && a <= 1))
                throw new Error("cutoff must be in [0.0, 1.0]: (" + a + ")");
            for (o = [],
            s = new i,
            s.setSeq2(e),
            l = 0,
            d = t.length; l < d; l++)
                c = t[l],
                s.setSeq1(c),
                s.realQuickRatio() >= a && s.quickRatio() >= a && s.ratio() >= a && o.push([s.ratio(), c]);
            for (o = n.nlargest(o, r, m),
            g = [],
            f = 0,
            h = o.length; f < h; f++)
                p = o[f],
                u = p[0],
                c = p[1],
                g.push(c);
            return g
        }
        ,
        v = function(e, t) {
            var n, r, a;
            for (a = [0, e.length],
            n = a[0],
            r = a[1]; n < r && e[n] === t; )
                n++;
            return n
        }
        ,
        e = function() {
            function e(e, t) {
                this.linejunk = e,
                this.charjunk = t
            }
            return e.prototype.compare = function(e, t) {
                var n, r, a, o, s, u, c, l, f, d, h, p, m, g, v;
                for (s = new i(this.linejunk,e,t),
                l = [],
                g = s.getOpcodes(),
                d = 0,
                p = g.length; d < p; d++) {
                    switch (v = g[d],
                    f = v[0],
                    r = v[1],
                    n = v[2],
                    o = v[3],
                    a = v[4],
                    f) {
                    case "replace":
                        u = this._fancyReplace(e, r, n, t, o, a);
                        break;
                    case "delete":
                        u = this._dump("-", e, r, n);
                        break;
                    case "insert":
                        u = this._dump("+", t, o, a);
                        break;
                    case "equal":
                        u = this._dump(" ", e, r, n);
                        break;
                    default:
                        throw new Error("unknow tag (" + f + ")")
                    }
                    for (h = 0,
                    m = u.length; h < m; h++)
                        c = u[h],
                        l.push(c)
                }
                return l
            }
            ,
            e.prototype._dump = function(e, t, n, r) {
                var a, i, o;
                for (o = [],
                a = i = n; n <= r ? i < r : i > r; a = n <= r ? ++i : --i)
                    o.push("" + e + " " + t[a]);
                return o
            }
            ,
            e.prototype._plainReplace = function(e, t, n, r, a, i) {
                var o, s, u, c, l, f, d, h, p, m;
                for (i - a < n - t ? (o = this._dump("+", r, a, i),
                l = this._dump("-", e, t, n)) : (o = this._dump("-", e, t, n),
                l = this._dump("+", r, a, i)),
                c = [],
                m = [o, l],
                f = 0,
                h = m.length; f < h; f++)
                    for (s = m[f],
                    d = 0,
                    p = s.length; d < p; d++)
                        u = s[d],
                        c.push(u);
                return c
            }
            ,
            e.prototype._fancyReplace = function(e, t, n, r, a, o) {
                var s, u, c, l, f, d, h, p, m, g, v, y, b, _, w, A, x, M, k, T, S, E, C, O, D, j, P, z, N, W, L, R, q, Y, B, H, F, I, U, G, $, V, K, X, J, Z, Q, ee, te;
                for (F = [.74, .75],
                h = F[0],
                w = F[1],
                _ = new i(this.charjunk),
                I = [null, null],
                A = I[0],
                x = I[1],
                C = [],
                k = D = a; a <= o ? D < o : D > o; k = a <= o ? ++D : --D)
                    for (g = r[k],
                    _.setSeq2(g),
                    M = j = t; t <= n ? j < n : j > n; M = t <= n ? ++j : --j)
                        u = e[M],
                        u !== g ? (_.setSeq1(u),
                        _.realQuickRatio() > h && _.quickRatio() > h && _.ratio() > h && (K = [_.ratio(), M, k],
                        h = K[0],
                        p = K[1],
                        m = K[2])) : null === A && (V = [M, k],
                        A = V[0],
                        x = V[1]);
                if (h < w) {
                    if (null === A) {
                        for (X = this._plainReplace(e, t, n, r, a, o),
                        P = 0,
                        N = X.length; P < N; P++)
                            E = X[P],
                            C.push(E);
                        return C
                    }
                    J = [A, x, 1],
                    p = J[0],
                    m = J[1],
                    h = J[2]
                } else
                    A = null;
                for (Z = this._fancyHelper(e, t, p, r, a, m),
                z = 0,
                W = Z.length; z < W; z++)
                    E = Z[z],
                    C.push(E);
                if (Q = [e[p], r[m]],
                s = Q[0],
                d = Q[1],
                null === A) {
                    for (f = b = "",
                    _.setSeqs(s, d),
                    ee = _.getOpcodes(),
                    Y = 0,
                    L = ee.length; Y < L; Y++)
                        switch (te = ee[Y],
                        O = te[0],
                        c = te[1],
                        l = te[2],
                        v = te[3],
                        y = te[4],
                        U = [l - c, y - v],
                        T = U[0],
                        S = U[1],
                        O) {
                        case "replace":
                            f += Array(T + 1).join("^"),
                            b += Array(S + 1).join("^");
                            break;
                        case "delete":
                            f += Array(T + 1).join("-");
                            break;
                        case "insert":
                            b += Array(S + 1).join("+");
                            break;
                        case "equal":
                            f += Array(T + 1).join(" "),
                            b += Array(S + 1).join(" ");
                            break;
                        default:
                            throw new Error("unknow tag (" + O + ")")
                        }
                    for (G = this._qformat(s, d, f, b),
                    B = 0,
                    R = G.length; B < R; B++)
                        E = G[B],
                        C.push(E)
                } else
                    C.push("  " + s);
                for ($ = this._fancyHelper(e, p + 1, n, r, m + 1, o),
                H = 0,
                q = $.length; H < q; H++)
                    E = $[H],
                    C.push(E);
                return C
            }
            ,
            e.prototype._fancyHelper = function(e, t, n, r, a, i) {
                var o;
                return o = [],
                t < n ? o = a < i ? this._fancyReplace(e, t, n, r, a, i) : this._dump("-", e, t, n) : a < i && (o = this._dump("+", r, a, i)),
                o
            }
            ,
            e.prototype._qformat = function(e, t, n, r) {
                var a, i;
                return i = [],
                a = l(v(e, "\t"), v(t, "\t")),
                a = l(a, v(n.slice(0, a), " ")),
                a = l(a, v(r.slice(0, a), " ")),
                n = n.slice(a).replace(/\s+$/, ""),
                r = r.slice(a).replace(/\s+$/, ""),
                i.push("- " + e),
                n.length && i.push("? " + Array(a + 1).join("\t") + n + "\n"),
                i.push("+ " + t),
                r.length && i.push("? " + Array(a + 1).join("\t") + r + "\n"),
                i
            }
            ,
            e
        }(),
        a = function(e, t) {
            return null == t && (t = /^\s*#?\s*$/),
            t.test(e)
        }
        ,
        r = function(e, t) {
            return null == t && (t = " \t"),
            w.call(t, e) >= 0
        }
        ,
        b = function(e, t) {
            var n, r;
            return n = e + 1,
            r = t - e,
            1 === r ? "" + n : (r || n--,
            "" + n + "," + r)
        }
        ,
        h = function(e, t, n) {
            var r, a, o, s, u, c, l, f, d, h, p, m, g, v, y, _, w, A, x, M, k, T, S, E, C, O, D, j, P, z, N, W, L, R, q, Y, B, H;
            for (W = null != n ? n : {},
            u = W.fromfile,
            M = W.tofile,
            c = W.fromfiledate,
            k = W.tofiledate,
            _ = W.n,
            y = W.lineterm,
            null == u && (u = ""),
            null == M && (M = ""),
            null == c && (c = ""),
            null == k && (k = ""),
            null == _ && (_ = 3),
            null == y && (y = "\n"),
            v = [],
            w = !1,
            L = new i(null,e,t).getGroupedOpcodes(),
            T = 0,
            O = L.length; T < O; T++)
                for (l = L[T],
                w || (w = !0,
                s = c ? "\t" + c : "",
                x = k ? "\t" + k : "",
                v.push("--- " + u + s + y),
                v.push("+++ " + M + x + y)),
                R = [l[0], l[l.length - 1]],
                o = R[0],
                m = R[1],
                r = b(o[1], m[2]),
                a = b(o[3], m[4]),
                v.push("@@ -" + r + " +" + a + " @@" + y),
                S = 0,
                D = l.length; S < D; S++)
                    if (q = l[S],
                    A = q[0],
                    f = q[1],
                    d = q[2],
                    h = q[3],
                    p = q[4],
                    "equal" !== A) {
                        if ("replace" === A || "delete" === A)
                            for (B = e.slice(f, d),
                            C = 0,
                            P = B.length; C < P; C++)
                                g = B[C],
                                v.push("-" + g);
                        if ("replace" === A || "insert" === A)
                            for (H = t.slice(h, p),
                            N = 0,
                            z = H.length; N < z; N++)
                                g = H[N],
                                v.push("+" + g)
                    } else
                        for (Y = e.slice(f, d),
                        E = 0,
                        j = Y.length; E < j; E++)
                            g = Y[E],
                            v.push(" " + g);
            return v
        }
        ,
        y = function(e, t) {
            var n, r;
            return n = e + 1,
            r = t - e,
            r || n--,
            r <= 1 ? "" + n : "" + n + "," + (n + r - 1)
        }
        ,
        o = function(e, t, n) {
            var r, a, o, s, u, c, l, f, d, h, m, g, v, b, _, w, A, x, M, k, T, S, E, C, O, D, j, P, z, N, W, L, R, q, Y, B, H, F, I, U;
            for (q = null != n ? n : {},
            u = q.fromfile,
            T = q.tofile,
            c = q.fromfiledate,
            S = q.tofiledate,
            w = q.n,
            _ = q.lineterm,
            null == u && (u = ""),
            null == T && (T = ""),
            null == c && (c = ""),
            null == S && (S = ""),
            null == w && (w = 3),
            null == _ && (_ = "\n"),
            A = {
                insert: "+ ",
                delete: "- ",
                replace: "! ",
                equal: "  "
            },
            x = !1,
            b = [],
            Y = new i(null,e,t).getGroupedOpcodes(),
            C = 0,
            P = Y.length; C < P; C++)
                if (l = Y[C],
                !x) {
                    if (x = !0,
                    s = c ? "\t" + c : "",
                    k = S ? "\t" + S : "",
                    b.push("*** " + u + s + _),
                    b.push("--- " + T + k + _),
                    B = [l[0], l[l.length - 1]],
                    o = B[0],
                    g = B[1],
                    b.push("***************" + _),
                    r = y(o[1], g[2]),
                    b.push("*** " + r + " ****" + _),
                    p(function() {
                        var e, t, n, r;
                        for (r = [],
                        e = 0,
                        t = l.length; e < t; e++)
                            n = l[e],
                            M = n[0],
                            E = n[1],
                            E = n[2],
                            E = n[3],
                            E = n[4],
                            r.push("replace" === M || "delete" === M);
                        return r
                    }()))
                        for (O = 0,
                        z = l.length; O < z; O++)
                            if (H = l[O],
                            M = H[0],
                            f = H[1],
                            d = H[2],
                            E = H[3],
                            E = H[4],
                            "insert" !== M)
                                for (F = e.slice(f, d),
                                D = 0,
                                N = F.length; D < N; D++)
                                    v = F[D],
                                    b.push(A[M] + v);
                    if (a = y(o[3], g[4]),
                    b.push("--- " + a + " ----" + _),
                    p(function() {
                        var e, t, n, r;
                        for (r = [],
                        e = 0,
                        t = l.length; e < t; e++)
                            n = l[e],
                            M = n[0],
                            E = n[1],
                            E = n[2],
                            E = n[3],
                            E = n[4],
                            r.push("replace" === M || "insert" === M);
                        return r
                    }()))
                        for (j = 0,
                        W = l.length; j < W; j++)
                            if (I = l[j],
                            M = I[0],
                            E = I[1],
                            E = I[2],
                            h = I[3],
                            m = I[4],
                            "delete" !== M)
                                for (U = t.slice(h, m),
                                R = 0,
                                L = U.length; R < L; R++)
                                    v = U[R],
                                    b.push(A[M] + v)
                }
            return b
        }
        ,
        f = function(t, n, a, i) {
            return null == i && (i = r),
            new e(a,i).compare(t, n)
        }
        ,
        d = function(e, t) {
            var n, r, a, i, o, s, u;
            if (i = {
                1: "- ",
                2: "+ "
            }[t],
            !i)
                throw new Error("unknow delta choice (must be 1 or 2): " + t);
            for (a = ["  ", i],
            r = [],
            o = 0,
            s = e.length; o < s; o++)
                n = e[o],
                u = n.slice(0, 2),
                w.call(a, u) >= 0 && r.push(n.slice(2));
            return r
        }
        ,
        t._arrayCmp = m,
        t.SequenceMatcher = i,
        t.getCloseMatches = u,
        t._countLeading = v,
        t.Differ = e,
        t.IS_LINE_JUNK = a,
        t.IS_CHARACTER_JUNK = r,
        t._formatRangeUnified = b,
        t.unifiedDiff = h,
        t._formatRangeContext = y,
        t.contextDiff = o,
        t.ndiff = f,
        t.restore = d
    }
    ).call(this)
})
  , Zm = Jm
  , Qm = /\d/
  , eg = ["print", "archive", "comment", "discuss", "e-mail", "email", "share", "reply", "all", "login", "sign", "single", "adx", "entry-unrelated"]
  , tg = new RegExp(eg.join("|"),"i")
  , ng = new RegExp("(next|weiter|continue|>([^|]|$)|»([^|]|$))","i")
  , rg = new RegExp("(first|last|end)","i")
  , ag = new RegExp("(prev|earl|old|new|<|«)","i")
  , ig = {
    extract: function(e) {
        var t = e.$
          , n = e.url
          , r = e.parsedUrl
          , a = e.previousUrls
          , i = void 0 === a ? [] : a;
        r = r || Bs.parse(n);
        var o = S(n)
          , s = C(n, r)
          , u = t("a[href]").toArray()
          , c = zt({
            links: u,
            articleUrl: o,
            baseUrl: s,
            parsedUrl: r,
            $: t,
            previousUrls: i
        });
        if (!c)
            return null;
        var l = Vu(c).reduce(function(e, t) {
            var n = c[t];
            return n.score > e.score ? n : e
        }, {
            score: -100
        });
        return l.score >= 50 ? l.href : null
    }
}
  , og = ["og:url"]
  , sg = {
    extract: function(e) {
        var t = e.$
          , n = e.url
          , r = e.metaCache
          , a = t("link[rel=canonical]");
        if (0 !== a.length) {
            var i = a.attr("href");
            if (i)
                return Wt(i)
        }
        var o = Le(t, og, r);
        return Wt(o ? o : n)
    }
}
  , ug = {
    ellipse: "…",
    chars: [" ", "-"],
    max: 140,
    truncate: !0
}
  , cg = function(e, t, n) {
    if ("string" != typeof e || 0 === e.length)
        return "";
    if (0 === t)
        return "";
    n = n || {};
    for (var r in ug)
        null !== n[r] && "undefined" != typeof n[r] || (n[r] = ug[r]);
    return n.max = t || n.max,
    Lt(e, n.max, n.ellipse, n.chars, n.truncate)
}
  , lg = ["og:description", "twitter:description"]
  , fg = {
    extract: function(e) {
        var t = e.$
          , n = e.content
          , r = e.metaCache
          , a = Le(t, lg, r);
        if (a)
            return Rt(Ye(a, t));
        var i = 500         //Excerpt Length
          , o = n.slice(0, 5 * i);
        return Rt(t(o).text(), t, i)
    }
}
  , dg = {
    extract: function(e) {
        var t = e.content
          , n = Is.load(t)
          , r = n("div").first()
          , a = M(r.text());
        return a.split(/\s/).length
    }
}
  , hg = {
    domain: "*",
    title: Sm.extract,
    date_published: Rm.extract,
    author: Pm.extract,
    content: Am.extract.bind(Am),
    lead_image_url: Vm.extract,
    dek: qm.extract,
    next_page_url: ig.extract,
    url_and_domain: sg.extract,
    excerpt: fg.extract,
    word_count: dg.extract,
    direction: function(e) {
        var t = e.title;
        return Uh.getDirection(t)
    },
    extract: function(e) {
        var t = e.html
          , n = e.$;
        if (t && !n) {
            var r = Is.load(t);
            e.$ = r
        }
        var a = this.title(e)
          , i = this.date_published(e)
          , o = this.author(e)
          , s = this.content(da({}, e, {
            title: a
        }))
          , u = this.lead_image_url(da({}, e, {
            content: s
        }))
          , c = this.dek(da({}, e, {
            content: s
        }))
          , l = this.next_page_url(e)
          , f = this.excerpt(da({}, e, {
            content: s
        }))
          , d = this.word_count(da({}, e, {
            content: s
        }))
          , h = this.direction({
            title: a
        })
          , p = this.url_and_domain(e)
          , m = p.url
          , g = p.domain;
        return {
            title: a,
            author: o,
            date_published: i || null,
            dek: c,
            lead_image_url: u,
            content: s,
            next_page_url: l,
            url: m,
            domain: g,
            excerpt: f,
            word_count: d,
            direction: h
        }
    }
}
  , pg = {
    'meta[name="al:ios:app_name"][value="Medium"]': xd,
    'meta[name="generator"][value="blogger"]': od
}
  , mg = {
    extract: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : hg
          , t = arguments[1]
          , n = t
          , r = n.contentOnly
          , a = n.extractedTitle;
        if ("*" === e.domain)
            return e.extract(t);
        if (t = da({}, t, {
            extractor: e
        }),
        r) {
            var i = Ut(da({}, t, {
                type: "content",
                extractHtml: !0,
                title: a
            }));
            return {
                content: i
            }
        }
        var o = Ut(da({}, t, {
            type: "title"
        }))
          , s = Ut(da({}, t, {
            type: "date_published"
        }))
          , u = Ut(da({}, t, {
            type: "author"
        }))
          , c = Ut(da({}, t, {
            type: "next_page_url"
        }))
          , l = Ut(da({}, t, {
            type: "content",
            extractHtml: !0,
            title: o
        }))
          , f = Ut(da({}, t, {
            type: "lead_image_url",
            content: l
        }))
          , d = Ut(da({}, t, {
            type: "excerpt",
            content: l
        }))
          , h = Ut(da({}, t, {
            type: "dek",
            content: l,
            excerpt: d
        }))
          , p = Ut(da({}, t, {
            type: "word_count",
            content: l
        }))
          , m = Ut(da({}, t, {
            type: "direction",
            title: o
        }))
          , g = Ut(da({}, t, {
            type: "url_and_domain"
        })) || {
            url: null,
            domain: null
        }
          , v = g.url
          , y = g.domain;
        return {
            title: o,
            content: l,
            author: u,
            date_published: s,
            lead_image_url: f,
            dek: h,
            next_page_url: c,
            url: v,
            domain: y,
            excerpt: d,
            word_count: p,
            direction: m
        }
    }
}
  , gg = function() {
    function e(e) {
        return t.apply(this, arguments)
    }
    var t = ps(kn.mark(function e(t) {
        var n, r, a, i, o, s = t.next_page_url, u = t.html, c = t.$, l = t.metaCache, f = t.result, d = t.Extractor, h = t.title, p = t.url;
        return kn.wrap(function(e) {
            for (; ; )
                switch (e.prev = e.next) {
                case 0:
                    n = 1,
                    r = [S(p)];
                case 2:
                    if (!(s && n < 26)) {
                        e.next = 15;
                        break
                    }
                    return n += 1,
                    e.next = 6,
                    Kf.create(s);
                case 6:
                    c = e.sent,
                    u = c.html(),
                    a = {
                        url: s,
                        html: u,
                        $: c,
                        metaCache: l,
                        contentOnly: !0,
                        extractedTitle: h,
                        previousUrls: r
                    },
                    i = mg.extract(d, a),
                    r.push(s),
                    f = da({}, f, {
                        content: f.content + "<hr><h4>Page " + n + "</h4>" + i.content
                    }),
                    s = i.next_page_url,
                    e.next = 2;
                    break;
                case 15:
                    return o = hg.word_count({
                        content: "<div>" + f.content + "</div>"
                    }),
                    e.abrupt("return", da({}, f, {
                        total_pages: n,
                        pages_rendered: n,
                        word_count: o
                    }));
                case 17:
                case "end":
                    return e.stop()
                }
        }, e, this)
    }));
    return e
}()
  , vg = {
    parse: function(e, t) {
        var n = this
          , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return ps(kn.mark(function a() {
            var i, o, s, u, c, l, f, d, h, p, m, g;
            return kn.wrap(function(n) {
                for (; ; )
                    switch (n.prev = n.next) {
                    case 0:
                        if (i = r.fetchAllPages,
                        o = void 0 === i || i,
                        s = r.fallback,
                        u = void 0 === s || s,
                        !e && Is.browser && (e = window.location.href,
                        t = t || Is.html()),
                        c = Bs.parse(e),
                        G(c)) {
                            n.next = 5;
                            break
                        }
                        return n.abrupt("return", Cu.badUrl);
                    case 5:
                        return n.next = 7,
                        Kf.create(e, t, c);
                    case 7:
                        if (l = n.sent,
                        f = Yt(e, c, l),
                        !l.failed) {
                            n.next = 11;
                            break
                        }
                        return n.abrupt("return", l);
                    case 11:
                        if (t || (t = l.html()),
                        d = l("meta").map(function(e, t) {
                            return l(t).attr("name")
                        }).toArray(),
                        h = mg.extract(f, {
                            url: e,
                            html: t,
                            $: l,
                            metaCache: d,
                            parsedUrl: c,
                            fallback: u
                        }),
                        p = h,
                        m = p.title,
                        g = p.next_page_url,
                        !o || !g) {
                            n.next = 21;
                            break
                        }
                        return n.next = 18,
                        gg({
                            Extractor: f,
                            next_page_url: g,
                            html: t,
                            $: l,
                            metaCache: d,
                            result: h,
                            title: m,
                            url: e
                        });
                    case 18:
                        h = n.sent,
                        n.next = 22;
                        break;
                    case 21:
                        h = da({}, h, {
                            total_pages: 1,
                            rendered_pages: 1
                        });
                    case 22:
                        return Is.browser && Is.cleanup(),
                        n.abrupt("return", h);
                    case 24:
                    case "end":
                        return n.stop()
                    }
            }, a, n)
        }))()
    },
    browser: !!Is.browser,
    fetchResource: function(e) {
        var t = this;
        return ps(kn.mark(function n() {
            return kn.wrap(function(t) {
                for (; ; )
                    switch (t.prev = t.next) {
                    case 0:
                        return t.next = 2,
                        Kf.create(e);
                    case 2:
                        return t.abrupt("return", t.sent);
                    case 3:
                    case "end":
                        return t.stop()
                    }
            }, n, t)
        }))()
    }
};
return vg
}();

debugger;

Mercury.parse().then(function t(res) {
    var mercuryArticle = res;
    window.mercuryArticle = res;


    window.result = {
        mercury : res
    }

    var div = document.createElement("div");
    div.innerHTML = mercuryArticle.content || "";
    mercuryArticle.contentText = div.textContent || div.innerText || "";   
    
    var adoptableArticle = ReaderArticleFinderJS.adoptableArticle();
    var articleText = ReaderArticleFinderJS.articleTextContent();
    var articleTitle = ReaderArticleFinderJS.articleTitle();
    var safariArticle = {
        title: articleTitle,
        body: articleText,
        alternateBody: adoptableArticle && adoptableArticle.innerHTML
    }

    window.result.safari = safariArticle;

    var custom = populateCustomData(mercuryArticle);

    window.article = {
        mercury: mercuryArticle,
        safari: safariArticle,
        custom: custom
    }

    return window.article;
});

function populateCustomData(mercuryArticle) {

var custom ={};

var element = document.querySelector('meta[property="og:image"]');
var imageElement = element && element.getAttribute("content");

var element = document.querySelector('link[rel="amphtml"]');
var ampUrl = element && element.getAttribute("href");

custom.image = imageElement;
custom.url = ampUrl || null;

var div = document.createElement("div");
div.innerHTML = mercuryArticle.content || "";
div.querySelectorAll("img").forEach(function (c) { c.remove() });
div.querySelectorAll("figure").forEach(function (c) { c.remove() });
div.querySelectorAll("h2").forEach(function (c) { c.remove() });
div.querySelectorAll("amp-img").forEach(function (c) { c.remove() });
div.querySelectorAll("amp-carousel").forEach(function (c) { c.remove() });
div.querySelectorAll("time").forEach(function (c) { c.remove() });


if(window.location.href.includes("hindi.sportskeeda")) {
    div.querySelectorAll(".content>a[href]:first-child").forEach(function (c) { c.remove() });
    //Customize Div further here
} else if(window.location.href.includes("khabar.ndtv.com")) {
    div.querySelectorAll(".mainimage_caption").forEach(function (c) { c.remove() });
    //Customize Div further here
} else if(window.location.href.includes("aapkisaheli")) {
    div.querySelectorAll(".article-details>p:first-child").forEach(function (c) { c.remove() });
    //Customize Div further here
} else if(window.location.href.includes("outlookhindi")) {
    div.querySelectorAll("#breadcrum").forEach(function (c) { c.remove() });
    div.querySelectorAll(".mymainsldr").forEach(function (c) { c.remove() });
    div.querySelectorAll(".captn").forEach(function (c) { c.remove() });
    div.querySelectorAll(".inline_ad").forEach(function (c) { c.remove() });
    //Customize Div further here
} else if(window.location.href.includes("bollywoodhungama.com/hindi")) {
    div.querySelectorAll(".article-head").forEach(function (c) { c.remove() });
} else if(window.location.href.includes("cricbuzz.com")) {
    div.querySelectorAll(".cb-nws-sub-txt").forEach(function (c) { c.remove() });
} else if(window.location.href.includes("indianexpress.com")) {
    div.querySelectorAll(".custom-caption").forEach(function (c) { c.remove() });
    div.querySelectorAll('.editor').forEach(function (c) { c.remove() });
}  else if(window.location.href.includes("www.bollywoodhungama.com")) {
    div.querySelectorAll(".hashtagn").forEach(function (c) { c.remove() });
} else if(window.location.href.includes("thehindu.com")) {
    div.querySelectorAll(".more-in").forEach(function (c) { c.remove() });
} else if(window.location.href.includes("jagran.com")) {
    div.querySelectorAll(".article-summery").forEach(function (c) { c.remove() });
    div.querySelectorAll("strong").forEach(function (c) { c.remove() });
    div.querySelectorAll("#jagran_image_id").forEach(function (c) { c.remove() });
} else if(window.location.href.includes("aajtak")) {
    // var urls = document.querySelectorAll("link[rel=alternate][media]");
    // var url = Array.from(urls).find((item) => {
    //     return item.href.includes("m.aajtak");
    // });
    // if(!!url)
    //     custom.category = url.href;

    var category = '';
    document.querySelectorAll(".breadCumSec>div>a").forEach((item) => category += item.title);
    custom.category = category;

    div.querySelectorAll("#adBlockerOverlay").forEach(function (c) { c.remove() });
    div.querySelectorAll(".cinemaDetailContainer").forEach(function (c) { c.remove() });
    div.querySelectorAll(".editorDetailBBox").forEach(function (c) { c.remove() });  
} else if(window.location.href.includes("tripoto")) {

    div.querySelectorAll(".info-trip").forEach(function (c) { c.remove() });
    
    if(!!document.querySelector('[type="application/ld+json"]')) {
        try {
            var img =  JSON.parse(document.querySelector('[type="application/ld+json"]').innerText).image.url;
            custom.image = img;
        } catch (e) {

        }    
    }
   
} else if(window.location.href.includes("buzzfeed")) {
    div.querySelectorAll(".sub_buzz_content").forEach((c) => c.remove());
} else if(window.location.href.includes("filmibeat")) {
    if(!!document.querySelector('[type="application/ld+json"]')) {
        try {
            var img =  JSON.parse(document.querySelector('[type="application/ld+json"]').innerText).image.url;
            custom.image = img;
        } catch (e) {

        }    
    }
} else if(window.location.href.includes("cricketnmore")) {
    div.querySelectorAll(".news-body>div:first-child>p>strong").forEach((c) => c.remove());
    div.querySelectorAll("a[href]").forEach((c) => c.remove());
} else if(window.location.href.includes("outlookhindi")) {
    div.querySelectorAll(".captn").forEach((c) => c.remove());
    div.querySelectorAll(".als").forEach((c) => c.remove());
    div.querySelectorAll(".inline_ad").forEach((c) => c.remove());
} else if(window.location.href.includes("zeenews")) {
    div.querySelectorAll(".writer-block").forEach((c) => c.remove());
    div.querySelectorAll(".special").forEach((c) => c.remove());
    
}

window.div = div;

custom.articleText = div.textContent || div.innerText || "";  
custom.category = custom.category || ''

return custom; 
}
