---
title: "DeskHopのHotkeyを変更したい"
description: "Change hotkey in DeskHop after version 0.63"
publishDate: "2024/10/25"
tags: ["gaget"]
---

4月にDeskHopを自作してから半年経ちました。

マウス無しで2台のPCを行き来できるのは想像以上にめちゃくちゃ便利です。
最近ではWebで設定できるGUIなども追加されて、ますます便利さに磨きがかかっています。

ところで、2024年8付きにアップデートされたv0.63以降、PC切り替えのHotkeyが「CapsLock」から「左Ctrl + CapsLock」へ変更されました。
なんでもCapsLockを使えないと困る勢が一定数いたため変更されたようです。
確かにPCの本来の機能が失われてしまうというのは問題なのかもしれません。

ただ、今までCapsLock単押しで切り替えられていたのに余計なキーを押さなければならないのは疲れますね。
また、ミスタイプが多いマンなのでそもそもCapsLockは無効化してしまいたいという願望もあります。

というわけで、もともとのHotkeyに戻していきましょう。

## 手順
GitHubからcloneします
```bash
git clone https://github.com/hrvach/deskhop.git
cd $_
```


Hotkeyを設定してるファイルを開きます
```bash
nano src/keyborad.c
```


1行直します
```diff
hotkey_combo_t hotkeys[] = {
    /* Main keyboard switching hotkey */
-    {.modifier       = KEYBOARD_MODIFIER_LEFTCTRL,
+    {.modifier       = 0,
```


公式の手順通りに環境構築します
```bash
sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi build-essential
```


ビルドして、buildディレクトリの直下に「deskhop.uf2」ができているのを確認します
```bash
cmake -S . -B build
cmake --build build
```


最後にDeskHopをつないだPCで「左Ctrl + 右Shift + c + o」でコンフィグモードに入って、出現したUSBドライブに「deskhop.uf2」をぶち込みましょう

めんどくさい方はビルド済みのものをおいておくので使ってください。


<a href="https://drive.google.com/file/d/1MAwBTq0mgRR9Y9tRPRK9jjY0DsyU6uYJ/view?usp=drive_link">ダウンロード</a>

（以上）
