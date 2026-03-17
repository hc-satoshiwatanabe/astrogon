import React, { useState } from "react";

interface Preset {
  id: string;
  title: string;
  tags: string[];
}

const presets: Preset[] = [
  { id: "t10", title: "商品別・販売日計", tags: ["販売日計", "商品別", "売上", "金額"] },
  { id: "b11", title: "商品別 総売上高の構成比", tags: ["構成比", "商品別", "売上", "金額"] },
  { id: "b12", title: "取引先別 総売上高の構成比", tags: ["構成比", "取引先別", "売上", "金額"] },
  { id: "b13", title: "都道府県別 総売上高の構成比", tags: ["構成比", "都道府県別", "売上", "金額"] },
  { id: "b14", title: "担当者別 総売上高の構成比", tags: ["構成比", "担当者別", "売上", "金額"] },
  { id: "r10", title: "倉庫別売上金額（総売上）", tags: ["倉庫別", "売上", "金額"] },
  { id: "r20", title: "倉庫別戻入金額", tags: ["倉庫別", "戻入", "金額"] },
  { id: "s10", title: "倉庫別売上数量（総売上）", tags: ["倉庫別", "売上", "数量"] },
  { id: "s20", title: "倉庫別戻入数量", tags: ["倉庫別", "戻入", "数量"] },
  { id: "a10", title: "月次総売上推移", tags: ["月次推移", "売上", "金額"] },
  { id: "a20", title: "月次戻入推移", tags: ["月次推移", "戻入", "金額"] },
  { id: "a30", title: "月次純売上推移", tags: ["月次推移", "純売上", "金額"] },
  { id: "c10", title: "総売上累計推移", tags: ["累計推移", "売上", "金額"] },
  { id: "c30", title: "純売上累計推移", tags: ["累計推移", "純売上", "金額"] },
  { id: "d11", title: "商品別 総売上累計推移", tags: ["累計推移", "商品別", "売上", "金額"] },
  { id: "d12", title: "取引先別 総売上累計推移", tags: ["累計推移", "取引先別", "売上", "金額"] },
  { id: "d13", title: "都道府県別 総売上累計推移", tags: ["累計推移", "都道府県別", "売上", "金額"] },
  { id: "d14", title: "担当者別 総売上累計推移", tags: ["累計推移", "担当者別", "売上", "金額"] },
  { id: "d15", title: "輸出国別 総売上累計推移", tags: ["累計推移", "輸出国別", "売上", "金額"] },
  { id: "d21", title: "商品別 純売上累計推移", tags: ["累計推移", "商品別", "純売上", "金額"] },
  { id: "d22", title: "取引先別 純売上累計推移", tags: ["累計推移", "取引先別", "純売上", "金額"] },
  { id: "d23", title: "都道府県別 純売上累計推移", tags: ["累計推移", "都道府県別", "純売上", "金額"] },
  { id: "d24", title: "担当者別 純売上累計推移", tags: ["累計推移", "担当者別", "純売上", "金額"] },
  { id: "e11", title: "商品別 売上金額ランキング", tags: ["ランキング", "商品別", "売上", "金額"] },
  { id: "e12", title: "取引先別 売上金額ランキング", tags: ["ランキング", "取引先別", "売上", "金額"] },
  { id: "e13", title: "都道府県別 売上金額ランキング", tags: ["ランキング", "都道府県別", "売上", "金額"] },
  { id: "e14", title: "担当者別 売上金額ランキング", tags: ["ランキング", "担当者別", "売上", "金額"] },
  { id: "e15", title: "容器容量別 売上金額ランキング", tags: ["ランキング", "容器容量別", "売上", "金額"] },
  { id: "e21", title: "商品別 戻入金額ランキング", tags: ["ランキング", "商品別", "戻入", "金額"] },
  { id: "e22", title: "取引先別 戻入金額ランキング", tags: ["ランキング", "取引先別", "戻入", "金額"] },
  { id: "f11", title: "商品別 売上数量ランキング", tags: ["ランキング", "商品別", "売上", "数量"] },
  { id: "f12", title: "取引先別 売上数量ランキング", tags: ["ランキング", "取引先別", "売上", "数量"] },
  { id: "f13", title: "都道府県別 売上数量ランキング", tags: ["ランキング", "都道府県別", "売上", "数量"] },
  { id: "f14", title: "担当者別 売上数量ランキング", tags: ["ランキング", "担当者別", "売上", "数量"] },
  { id: "f15", title: "容器容量別 売上数量ランキング", tags: ["ランキング", "容器容量別", "売上", "数量"] },
  { id: "f21", title: "商品別 戻入数量ランキング", tags: ["ランキング", "商品別", "戻入", "数量"] },
  { id: "f22", title: "取引先別 戻入数量ランキング", tags: ["ランキング", "取引先別", "戻入", "数量"] },
  { id: "p12", title: "仕入先別 仕入金額ランキング", tags: ["ランキング", "仕入先別", "仕入", "金額"] },
  { id: "p13", title: "商品別 仕入金額ランキング", tags: ["ランキング", "商品別", "仕入", "金額"] },
  { id: "p22", title: "仕入先別 返金金額ランキング", tags: ["ランキング", "仕入先別", "返金", "金額"] },
  { id: "p23", title: "商品別 返金金額ランキング", tags: ["ランキング", "商品別", "返金", "金額"] },
  { id: "q12", title: "仕入先別 仕入数量ランキング", tags: ["ランキング", "仕入先別", "仕入", "数量"] },
  { id: "q13", title: "商品別 仕入数量ランキング", tags: ["ランキング", "商品別", "仕入", "数量"] },
  { id: "q22", title: "仕入先別 返品数量ランキング", tags: ["ランキング", "仕入先別", "返品", "数量"] },
  { id: "q23", title: "商品別 返品数量ランキング", tags: ["ランキング", "商品別", "返品", "数量"] },
];

const allTags = Array.from(new Set(presets.flatMap((p) => p.tags))).sort();

const tagGroups: Record<string, string[]> = {
  "分析種別": ["販売日計", "構成比", "倉庫別", "月次推移", "累計推移", "ランキング"],
  "分類軸": ["商品別", "取引先別", "都道府県別", "担当者別", "容器容量別", "輸出国別", "仕入先別"],
  "データ種別": ["売上", "純売上", "戻入", "仕入", "返金", "返品"],
  "単位": ["金額", "数量"],
};

const PresetList = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setActiveTags([]);

  const filtered =
    activeTags.length === 0
      ? presets
      : presets.filter((p) => activeTags.every((tag) => p.tags.includes(tag)));

  return (
    <div>
      {/* Tag Search */}
      <div className="glass rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold m-0">タグで絞り込み</h3>
          {activeTags.length > 0 && (
            <button
              onClick={clearTags}
              className="text-sm px-3 py-1 rounded border border-border hover:bg-gray-100 dark:hover:bg-darkmode-bg-t"
            >
              クリア
            </button>
          )}
        </div>
        {Object.entries(tagGroups).map(([group, tags]) => (
          <div key={group} className="mb-3">
            <span className="text-sm font-semibold text-txt-light dark:text-darkmode-txt-light mr-2">
              {group}:
            </span>
            <div className="inline-flex flex-wrap gap-2 mt-1">
              {tags
                .filter((tag) => allTags.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                      activeTags.includes(tag)
                        ? "bg-txt-p text-white dark:bg-darkmode-txt-p dark:text-darkmode-bg-p border-transparent"
                        : "border-border dark:border-darkmode-border hover:bg-gray-100 dark:hover:bg-darkmode-bg-t"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-txt-light dark:text-darkmode-txt-light mb-4">
        {filtered.length} / {presets.length} 件のプリセット
      </p>

      {/* Preset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((preset) => (
          <a
            key={preset.id}
            href={`/manual.html#page-${preset.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-lg p-4 no-underline hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-darkmode-bg-t text-txt-light dark:text-darkmode-txt-light shrink-0">
                {preset.id.toUpperCase()}
              </span>
              <span className="font-semibold text-txt-p dark:text-darkmode-txt-p text-sm leading-tight">
                {preset.title}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {preset.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTags.includes(tag)
                      ? "bg-txt-p text-white dark:bg-darkmode-txt-p dark:text-darkmode-bg-p"
                      : "bg-gray-100 dark:bg-darkmode-bg-t text-txt-light dark:text-darkmode-txt-light"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-txt-light dark:text-darkmode-txt-light">
            該当するプリセットがありません。タグの組み合わせを変更してください。
          </p>
        </div>
      )}
    </div>
  );
};

export default PresetList;
