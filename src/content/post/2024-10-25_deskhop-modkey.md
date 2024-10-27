---
title: "DeskHopのHotkeyを変更したい"
description: "Change hotkey in DeskHop after version 0.63"
publishDate: "2024/10/25"
tags: ["gaget"]
---

4月にDeskHopを自作してから半年経ちました。

マウス無しで2台のPCを行き来できるのは想像以上にめちゃくちゃ便利で、手放せなくなっています。
最近はWebで設定できるGUIなども追加されて、ますます便利です。

ところで、2024年8付きにアップデートされたv0.63以降、PC切り替えのHotkeyが「CapsLock」から「左Ctrl + CapsLock」へ変更されました。
なんでもCapsLockを使えないと困る勢が一定数いたようです。

今までCapsLock単押しで切り替えられていたのに余計なキーを押さなければならないのは疲れますね。
また、ミスタイプが多いマンなのでそもそもCapsLockは無効化してしまいたいという願望もあります。

というわけで、もともとのHotkeyに戻していきましょう。

## 手順
cloneして、
```bash
git clone https://github.com/hrvach/deskhop.git
cd $_
```

Hotkeyを設定してるファイルを開いて、
```bash
nano src/keyborad.c
```

1行直す
```diff
hotkey_combo_t hotkeys[] = {
    /* Main keyboard switching hotkey */
-    {.modifier       = KEYBOARD_MODIFIER_LEFTCTRL,
+    {.modifier       = 0,
```

あとは公式の手順通りに環境構築して、
```bash
sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi build-essential
```

ビルドして出来上がり
```bash
cmake -S . -B build
cmake --build build
```

最後に「左Ctrl + 右Shift + c + o」でコンフィグモードに入って、出現したUSBドライブにbuildディレクトリの直下に入っている「deskhop.uf2」をぶち込んで終了です

（以上）